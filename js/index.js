
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 300
canvas.style.background = '#fafafa'


let xOffset1 = 0
let xOffset2 = 40

function round() {
  ctx.beginPath()
  let [a, b] = [51, 51]

  for (var times = 0; times < 360; times++) {
    let hudu = (2 * Math.PI / 360) * times;
    let x = a + Math.sin(hudu) * 50;
    let y = b + Math.cos(hudu) * 50    //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
    ctx.lineTo(x, y)
  }
  // ctx.closePath()
  ctx.stroke()
}

// round()

function getRandom(min, max) {
  const range = max - min + 1; 
  const random = Math.floor(Math.random() * range); 
  return min + random; 
}

let COUNT = 5
let xOffset = Array(COUNT).fill(0).map(el => getRandom(0, 1000))
let yOffset = Array(COUNT).fill(0).map(el => getRandom(5, 20))
let speed = Array(COUNT).fill(0).map(el => getRandom(1, 10))

// draw()
// draw2()

function draw (index = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath()
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * 0.02 + xOffset[index]) * yOffset[index] + (canvas.height / 2)
    ctx.lineTo(x, y)
  }
  ctx.strokeStyle = '#388e3c'
  ctx.stroke()
  
  xOffset = xOffset.map(el => el + 0.05)
  requestAnimationFrame(() => draw(index))

}

function draw2 (index = 2) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath()
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * 0.02 + xOffset[index]) * yOffset[index] + (canvas.height / 2)
    ctx.lineTo(x, y)
  }
  ctx.strokeStyle = '#f00'
  ctx.stroke()

  xOffset = xOffset.map(el => el + 0.2)
  requestAnimationFrame(() => draw2(index))
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