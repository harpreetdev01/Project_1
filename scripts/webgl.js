import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const webgl = (colors) => {
    const canvas = document.querySelector('#webgl');
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    let obj = null;

    // Function to update the object's material color
    const updateObjectColor = (colors) => {
        const newColor = new THREE.Color(`rgb(${colors.red}, ${colors.green}, ${colors.blue})`);
        if (obj) {
            obj.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.color.set(newColor);
                }
            });
        }
    };

    // MTL and OBJ Loader
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/assets/materials/plane.mtl', (planeMaterial) => {
        planeMaterial.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(planeMaterial);
        objLoader.load('/assets/models/plane.obj', (loadedObj) => {
            obj = loadedObj;
            obj.scale.set(3, 3, 3);
            obj.rotation.x = -Math.PI / 2;
            obj.position.set(0, 0.5, 1);
            scene.add(obj);

            // Initial color update after the object is loaded
            updateObjectColor(colors);
        }, undefined, (error) => {
            console.error('An error happened while loading the .obj file: ', error);
        });
    }, undefined, (error) => {
        console.error('An error happened while loading the .mtl file: ', error);
    });

    // Register the function to update colors dynamically from the sliders
    window.updateWebGLColor = (updatedColors) => {
        updateObjectColor(updatedColors);
    };

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    animate();
};

export default webgl;
