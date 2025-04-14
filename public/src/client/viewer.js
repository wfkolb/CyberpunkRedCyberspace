import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function initializeViewer() {
  const canvas = document.getElementById('three-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const ambientLight = new THREE.AmbientLight(0x00ff00, 1);
  scene.add(ambientLight);

  const loader = new FBXLoader();
  let currentModel = null;
  let modelIndex = 0;
  const modelFiles = [];

  // Fetch available FBX files from the server
  fetch('/fbx-files')
    .then(response => response.json())
    .then(fbxFiles => {
      modelFiles.push(...fbxFiles); // Store the list of .fbx files
      loadModel(modelFiles[modelIndex]); // Load the first model initially
    })
    .catch(error => {
      console.error('Error fetching .fbx files:', error);
    });

  // Load a model from the list of available .fbx files
  function loadModel(fbxFile) {
    const loader = new FBXLoader();
    loader.load(
      `assets/${fbxFile}`, // Make sure this path is correct
      (object) => {
        if (currentModel) {
          scene.remove(currentModel); // Remove the current model from the scene
        }
        currentModel = object;
        const scaleFactor = 0.05;  // Set your desired scale factor
        currentModel.scale.set(scaleFactor, scaleFactor, scaleFactor);  // Apply the scale
        object.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x00ff00,
              wireframe: true
            });
          }
        });
        scene.add(currentModel);
      },
      (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
      (err) => console.error('FBX load error:', err)
    );
  }

  // Set up camera
  camera.position.z = 10;

  // Rotation speed (in radians per second)
  const rotationSpeed = 0.01;

  function animate() {
    requestAnimationFrame(animate);

    // Rotate the current model at a fixed speed if it exists
    if (currentModel) {
      currentModel.rotation.y += rotationSpeed; // Rotate the model around the Y-axis
    }

    renderer.render(scene, camera);
  }

  animate();

  // Cycle through models every 5 seconds
  setInterval(() => {
    modelIndex = (modelIndex + 1) % modelFiles.length; // Move to the next model
    loadModel(modelFiles[modelIndex]);
  }, 5000); // Change every 5 seconds
}
