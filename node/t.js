const {Client} = require("yamux-js")
const {createConnection} = require("net");
const net = require("net")


const socket = createConnection(10001, 'localhost');
socket.on('connect', () => {
    const client = new Client()
    client.pipe(socket).pipe(client)

    const muxStream = client.open();


    muxStream.once('data', (data) => {
        console.log(data)
        if (data[0] === 0x05) {
            // 支持的认证方法，无认证
            muxStream.write(Buffer.from([0x05, 0x00]));

            // 接收 SOCKS5 请求
            muxStream.once('data', (request) => {
                if (request[0] === 0x05 && request[1] === 0x01 && request[2] === 0x00) {
                    const addressType = request[3];

                    let targetHost;
                    let targetPort;

                    if (addressType === 0x01) {
                        // IPv4 地址
                        targetHost = `${request[4]}.${request[5]}.${request[6]}.${request[7]}`;
                        targetPort = request.readUInt16BE(8);
                    } else if (addressType === 0x03) {
                        // 域名地址
                        const domainLength = request[4];
                        targetHost = request.slice(5, 5 + domainLength).toString();
                        targetPort = request.readUInt16BE(5 + domainLength);
                    } else if (addressType === 0x04) {
                        // IPv6 地址（示例中未处理）
                        console.error('IPv6 address is not supported in this example.');
                        muxStream.end();
                        return;
                    } else {
                        console.error('Unsupported address type.');
                        muxStream.end();
                        return;
                    }

                    console.log(`Connection request to ${targetHost}:${targetPort}`);

                    // 连接目标服务器
                    const target = net.createConnection(targetPort, targetHost, () => {
                        // 响应 SOCKS5 请求成功
                        muxStream.write(Buffer.from([0x05, 0x00, 0x00, addressType]));

                        // 数据转发
                        muxStream.pipe(target);
                        target.pipe(muxStream);

                        target.on('close', () => {
                            console.log('Target closed');
                            muxStream.end();
                        });

                        muxStream.on('close', () => {
                            console.log('Client closed');
                            target.end();
                        });
                    });

                    target.on('error', (err) => {
                        console.error('Error connecting to target:', err.message);
                        muxStream.write(Buffer.from([0x05, 0x01])); // 响应 SOCKS5 请求失败
                        muxStream.end();
                    });
                } else {
                    console.error('Unsupported SOCKS5 request.');
                    muxStream.end();
                }
            })

        } else {
            console.error('Unsupported SOCKS5 version.');
            client.end();
        }
    })
})