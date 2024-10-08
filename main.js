import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
// import Stats from './jsm/libs/stats.module.js'
// import { GUI } from './jsm/libs/lil-gui.module.min.js'

console.log(OBJLoader);

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement)

// Load FBX Model
const fbxLoader = new FBXLoader();

fbxLoader.load(
  '/assets/models/m-benz-f.fbx',
  function(object){
    console.log(object)
    // object.scale(1, 1, 1);
    scene.add(object);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error){
    console.error('An error happened', error);
  }
);

window.addEventListener(
    'resize',
    function () {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)


function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
