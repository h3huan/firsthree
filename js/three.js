import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoad = new THREE.TextureLoader();
const doorColorT = textureLoad.load("./pix/W3L.jpg");

const geometry = new THREE.BoxGeometry(1, 2, 1);
const basicMaterial = new THREE.MeshBasicMaterial({
  // color: "#aa3939",
  map: doorColorT,
});
const cube = new THREE.Mesh(geometry, basicMaterial);

//添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
//添加坐标辅助
const axisHelp = new THREE.AxesHelper(5);
scene.add(axisHelp);

scene.add(cube);
console.log(cube);

camera.position.z = 5;
const clock = new THREE.Clock();

gsap.to(cube.position, {
  x: 5,
  duration: 3,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: 1,
});
gsap.to(cube.rotation, { x: 5, duration: 3, ease: "power1.inOut" });

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
window.addEventListener("resize", () => {
  // console.log('dfs')
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
