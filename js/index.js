
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = 300
canvas.height = 160

let xOffset1 = 0
let xOffset2 = 40


requestAnimationFrame(draw)
requestAnimationFrame(draw1)


function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath()
  let point1 = []
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * 0.05 + xOffset1) * 3 + (canvas.height / 2)
    point1.push([x, y])
    ctx.lineTo(x, y)
  }
  ctx.lineTo(canvas.width - 1, 120)
  ctx.lineTo(1, 120)
  ctx.lineTo(point1[0][0] + 1, point1[0][1])
  // ctx.stroke()

  // ctx.fillStyle = '#ccc'

  let grd = ctx.createLinearGradient(0, 80, 0, 120)
  grd.addColorStop(0, 'rgba(0,0,0,0.2)');
  grd.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = grd
  ctx.fill()

  xOffset1 += 0.1
  requestAnimationFrame(draw)
}

function draw1 () {
  ctx.beginPath()
  let point1 = []
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * 0.03 + xOffset2) * 6 + (canvas.height / 2 - 4)
    point1.push([x, y])
    ctx.lineTo(x, y)
  }
  ctx.lineTo(canvas.width - 1, 120)
  ctx.lineTo(1, 120)
  ctx.lineTo(point1[0][0] + 1, point1[0][1])
  // ctx.stroke()

  // ctx.fillStyle = '#ccc'

  let grd = ctx.createLinearGradient(0, 80, 0, 120)
  grd.addColorStop(0, 'rgba(0,0,0,0.2)');
  grd.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = grd
  ctx.fill()

  xOffset2 += 0.1
  requestAnimationFrame(draw1)
}