
let canvas = document.getElementById('canvas')
// let ctx = canvas.getContext('2d')

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000)
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true
})
renderer.setSize(200, 200)
canvas.appendChild(renderer.domElement)

/**
 * 
 */
camera.position.z = 220
var geometry = new THREE.BoxGeometry(100, 100, 100)
var material = new THREE.MeshBasicMaterial({
  color: '#333333',
  wireframe: true,
  wireframeLinejoin: 'bevel'
})


var cube = new THREE.Mesh(geometry, material)
cube.rotation.z = Math.PI / 4
scene.add(cube)


function render() {
  requestAnimationFrame(render)
  cube.rotation.x += 0.02
  cube.rotation.y += 0.02
  renderer.render(scene, camera)
}

render()
