<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import earthImg from '@/assets/img/earth_night.jpg';
// @ts-ignore
import stars1 from '@/assets/img/stars1.png';
// @ts-ignore
import stars2 from '@/assets/img/stars2.png';
// @ts-ignore
import stars3 from '@/assets/img/stars3.png';
// @ts-ignore
import stars4 from '@/assets/img/stars4.png';
// @ts-ignore
import stars5 from '@/assets/img/stars5.png';
// @ts-ignore
import stars6 from '@/assets/img/stars6.png';

onMounted(() => prime());

function prime() {
  const canvas = document.getElementById('c');
  // NOTE Renderer | Responsible for taking all the data provided here *code itself* and renders it to the canvas
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  // NOTE Camera | What we see from our pov
  const camera = new THREE.PerspectiveCamera(77, 2, 0.1, 100);
  camera.position.z = 2;
  // NOTE Scene | Root of scene graph kinda like the landscape
  const scene = new THREE.Scene();

  const controls = new OrbitControls(camera, canvas);
  controls.mouseButtons.RIGHT = null;
  controls.minDistance = 2;
  controls.maxDistance = 4;
  const loader = new THREE.TextureLoader();

  // NOTE Geometry | Shape of the object
  const geometry = new THREE.IcosahedronGeometry(1, 12);
  // NOTE Material | Details of the object. shiny or flat, what color, what texture(s) to apply. Etc.
  const material = new THREE.MeshStandardMaterial({
    map: loader.load(earthImg),
    side: THREE.FrontSide
  });
  // NOTE Mesh | Finalized version of both geometry & material
  const earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.position.set(0, 0, 0);
  scene.add(earthMesh);

  // NOTE Setting skybox
  const skyboxTexture = new THREE.CubeTextureLoader()
    .load([
      stars1, // right
      stars2, // left
      stars3, // top
      stars4, // bottom
      stars5, // front
      stars6, // back
    ]);

  scene.background = skyboxTexture;

  // NOTE Ambient Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // NOTE Pointer Light
  const light = new THREE.PointLight(0xFFFFFF, 1, 100);
  scene.add(light);

  // NOTE Recursive | animating the globe
  const animate = (time) => {
    time *= 0.001 - 0.0006;
    // earthMesh.rotation.x = time;
    earthMesh.rotation.y = time;

    light.position.set(Math.sin(time) * 3, 1, Math.cos(time) * 3);

    if (resizeRendererToDisplaySize(canvas, renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}


// Responsible for checking the canvas width & height, in order to keep the canvas's resolution intact
function resizeRendererToDisplaySize(canvas, renderer) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

</script>


<template>
  <canvas id="c" class="c"></canvas>
</template>


<style lang="scss" scoped>
.c {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  height: 100%;
}
</style>
