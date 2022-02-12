import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

//Elements
const base_box_width = 16;
const base_box_height = 3;
const base_box_depth = 6;
const base_cylinder_height = 4;
const base_cylinder_radius = 0.8;
const round_cylinder = 32;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const wallColorTexture = textureLoader.load("/textures/wall/baseColor.jpg");
const wallAmbientOcclusionTexture = textureLoader.load(
  "/textures/wall/ambientOcclusion"
);
const wallHeightTexture = textureLoader.load("/textures/wall/height.jpg");
const wallNormalTexture = textureLoader.load("/textures/wall/normal.jpg");
const wallRoughnessTexture = textureLoader.load("/textures/wall/roughness.jpg");

const roofColorTexture = textureLoader.load("/textures/roof/baseColor.jpg");
const roofAmbientOcclusionTexture = textureLoader.load(
  "/textures/roof/ambientOcclusion"
);
const roofHeightTexture = textureLoader.load("/textures/roof/height.jpg");
const roofNormalTexture = textureLoader.load("/textures/roof/normal.jpg");
const roofRoughnessTexture = textureLoader.load("/textures/roof/roughness.jpg");

const cylinderColorTexture = textureLoader.load(
  "/textures/cylinder/baseColor.jpg"
);
const cylinderAmbientOcclusionTexture = textureLoader.load(
  "/textures/cylinder/ambientOcclusion"
);
const cylinderHeightTexture = textureLoader.load(
  "/textures/cylinder/height.jpg"
);
const cylinderNormalTexture = textureLoader.load(
  "/textures/cylinder/normal.jpg"
);
const cylinderRoughnessTexture = textureLoader.load(
  "/textures/cylinder/roughness.jpg"
);

const doorColorTexture = textureLoader.load("/textures/woodDoor/basecolor.jpg");
// const doorAlphaTexture = textureLoader.load("/textures/woodDoor/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/woodDoor/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/woodDoor/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/woodDoor/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "/textures/woodDoor/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "/textures/woodDoor/roughness.jpg"
);

const windowColorTexture = textureLoader.load(
  "/textures/window2/basecolor.jpg"
);
// const windowAlphaTexture = textureLoader.load("/textures/window/alpha.jpg");
const windowAmbientOcclusionTexture = textureLoader.load(
  "/textures/window2/ambientOcclusion.jpg"
);
const windowHeightTexture = textureLoader.load("/textures/window2/height.jpg");
const windowNormalTexture = textureLoader.load("/textures/window2/normal.jpg");
const windowMetalnessTexture = textureLoader.load(
  "/textures/window2/metallic.jpg"
);
const windowRoughnessTexture = textureLoader.load(
  "/textures/window2/roughness.jpg"
);
const windowOpacityTexture = textureLoader.load(
  "/textures/window2/opacity.jpg"
);

//metalic windows
// const windowAlphaTexture = textureLoader.load("/textures/window/alpha.jpg");
const metalWindowColorTexture = textureLoader.load(
  "/textures/window1/basecolor.jpg"
);

const metalWindowAmbientOcclusionTexture = textureLoader.load(
  "/textures/window1/ambientOcclusion.jpg"
);
const metalWindowHeightTexture = textureLoader.load(
  "/textures/window1/height.jpg"
);
const metalWindowNormalTexture = textureLoader.load(
  "/textures/window1/normal.jpg"
);
const metalWindowMetalnessTexture = textureLoader.load(
  "/textures/window1/metallic.jpg"
);
const metalWindowRoughnessTexture = textureLoader.load(
  "/textures/window1/roughness.jpg"
);
const metalWindowOpacityTexture = textureLoader.load(
  "/textures/window1/opacity.jpg"
);

const forestGroundColorTexture = textureLoader.load(
  "/textures/forestGround/baseColor.jpg"
);

// const forestGroundAlphaTexture = textureLoader.load("/textures/forestGround/alpha.jpg");
const forestGroundAmbientOcclusionTexture = textureLoader.load(
  "/textures/forestGround/ambientOcclusion.jpg"
);
const forestGroundHeightTexture = textureLoader.load(
  "/textures/forestGround/height.jpg"
);
const forestGroundNormalTexture = textureLoader.load(
  "/textures/forestGround/normal.jpg"
);
const forestGroundRoughnessTexture = textureLoader.load(
  "/textures/forestGround/roughness.jpg"
);

forestGroundColorTexture.repeat.set(16, 16);
forestGroundAmbientOcclusionTexture.repeat.set(16, 16);
forestGroundNormalTexture.repeat.set(16, 16);
forestGroundRoughnessTexture.repeat.set(16, 16);

forestGroundColorTexture.wrapS = THREE.RepeatWrapping;
forestGroundAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
forestGroundNormalTexture.wrapS = THREE.RepeatWrapping;
forestGroundRoughnessTexture.wrapS = THREE.RepeatWrapping;

forestGroundColorTexture.wrapT = THREE.RepeatWrapping;
forestGroundAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
forestGroundNormalTexture.wrapT = THREE.RepeatWrapping;
forestGroundRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * Castle
 */
const castle = new THREE.Group();
scene.add(castle);

//Base Structure

const castle_base = new THREE.Group();

const base_box = createShape([
  "Box",
  base_box_width,
  base_box_height,
  base_box_depth,
]);

base_box.position.y = base_box_height / 2;

const base_box_front = createShape([
  "Box",
  (base_box_width - 4) / 4,
  base_box_height,
  base_box_depth / 6,
]);

base_box_front.position.set(
  0,
  base_box_height / 2,
  base_box_depth / 2 + base_box_depth / 12
);

const base_cylinder_front_with_roof_left = new THREE.Group();

const base_cylinder_front_left = createShape([
  "Cylinder",
  base_cylinder_radius,
  base_cylinder_radius,
  base_cylinder_height,
  round_cylinder,
]);

base_cylinder_front_left.position.set(
  -2 - base_cylinder_radius,
  base_cylinder_height / 2 + 0.001,
  base_box_depth / 2
);

const base_cone_front_left = createShape([
  "Cone",
  base_cylinder_radius + 0.2,
  base_cylinder_height / 2,
  round_cylinder / 2,
]);

base_cone_front_left.position.set(
  -2 - base_cylinder_radius,
  base_cylinder_height + base_cylinder_height / 4 + 0.001,
  base_box_depth / 2
);

base_cylinder_front_with_roof_left.add(
  base_cylinder_front_left,
  base_cone_front_left
);

const base_cylinder_front_with_roof_right = new THREE.Group();

const base_cylinder_front_right = createShape([
  "Cylinder",
  base_cylinder_radius,
  base_cylinder_radius,
  base_cylinder_height,
  round_cylinder,
]);

base_cylinder_front_right.position.set(
  2 + base_cylinder_radius,
  base_cylinder_height / 2 + 0.001,
  base_box_depth / 2
);

const base_cone_front_right = createShape([
  "Cone",
  base_cylinder_radius + 0.2,
  base_cylinder_height / 2,
  round_cylinder / 2,
]);

base_cone_front_right.position.set(
  2 + base_cylinder_radius,
  base_cylinder_height + base_cylinder_height / 4 + 0.001,
  base_box_depth / 2
);

base_cylinder_front_with_roof_right.add(
  base_cylinder_front_right,
  base_cone_front_right
);

const base_cylinder_with_roof_left = new THREE.Group();

const base_cylinder_left = createShape([
  "Cylinder",
  base_cylinder_radius,
  base_cylinder_radius,
  base_cylinder_height + 1,
  round_cylinder,
]);

base_cylinder_left.position.set(
  -base_box_width / 2,
  (base_cylinder_height + 1) / 2 + 0.001,
  base_box_depth / 2
);

const base_cone_left = createShape([
  "Cone",
  base_cylinder_radius + 0.2,
  base_cylinder_height / 2,
  round_cylinder / 2,
]);

base_cone_left.position.set(
  -base_box_width / 2,
  base_cylinder_height + 1 + base_cylinder_height / 4 + 0.001,
  base_box_depth / 2
);

base_cylinder_with_roof_left.add(base_cylinder_left, base_cone_left);

const base_cylinder_with_roof_right = new THREE.Group();

const base_cylinder_right = createShape([
  "Cylinder",
  base_cylinder_radius,
  base_cylinder_radius,
  base_cylinder_height + 1,
  round_cylinder,
]);

base_cylinder_right.position.set(
  base_box_width / 2,
  (base_cylinder_height + 1) / 2 + 0.001,
  base_box_depth / 2
);

const base_cone_right = createShape([
  "Cone",
  base_cylinder_radius + 0.2,
  base_cylinder_height / 2,
  round_cylinder / 2,
]);

base_cone_right.position.set(
  base_box_width / 2,
  base_cylinder_height + 1 + base_cylinder_height / 4 + 0.001,
  base_box_depth / 2
);

base_cylinder_with_roof_right.add(base_cylinder_right, base_cone_right);

castle_base.add(
  base_box,
  base_box_front,
  base_cylinder_front_with_roof_left,
  base_cylinder_front_with_roof_right,
  base_cylinder_with_roof_left,
  base_cylinder_with_roof_right
);

//West
const castle_west = new THREE.Group();
//level1
const level1_west_box = createShape([
  "Box",
  (base_box_width - 6) / 2,
  base_box_height / 3,
  base_box_depth - 1,
]);

level1_west_box.position.set(-5, base_box_height + 0.5);

const level1_west_box_roof = createShape(["Cone", 4, 2, 4]);

level1_west_box_roof.position.set(-5, base_box_height + 2);
level1_west_box_roof.rotation.y = Math.PI * 0.25;

//level2

const level2_west_box = createShape(["Box", 2, 4, 2]);

level2_west_box.position.set(-5, 6);

const level2_west_box_roof = createShape(["Cone", 2, 2, 4]);
level2_west_box_roof.position.set(-5, 9);
level2_west_box_roof.rotation.y = Math.PI * 0.25;

const level2_west_connecting_box = createShape(["Box", 3, 4, 2]);
level2_west_connecting_box.position.set(-3, 5);

const level12_west_cylinder = createShape([
  "Cylinder",
  base_cylinder_radius / 2,
  base_cylinder_radius / 2,
  4,
  round_cylinder,
]);
level12_west_cylinder.position.set(-3, 8);

const level12_west_cylinder_roof = createShape([
  "Cone",
  base_cylinder_radius / 2 + 0.2,
  2,
  round_cylinder / 2,
]);

level12_west_cylinder_roof.position.set(-3, 11);

castle_west.add(
  level1_west_box,
  level1_west_box_roof,
  level2_west_box,
  level2_west_box_roof,
  level2_west_connecting_box,
  level12_west_cylinder,
  level12_west_cylinder_roof
);
//Center
const castle_center = new THREE.Group();

const center_box = createShape(["Box", 4, 5, base_box_depth - 1]);
center_box.position.set(0, 5);

const center_box_roof = createShape(["Cone", 4, 4, 4]);
center_box_roof.position.set(0, 9.5);
center_box_roof.rotation.y = Math.PI * 0.25;

const center_cylinder_right = createShape([
  "Cylinder",
  base_cylinder_radius / 2,
  base_cylinder_radius / 2,
  2,
  round_cylinder,
]);
center_cylinder_right.position.set(2, 7.5, 2.8);

const center_cylinder_roof_right = createShape([
  "Cone",
  base_cylinder_radius / 2 + 0.2,
  2,
  round_cylinder / 2,
]);

center_cylinder_roof_right.position.set(2, 9, 2.8);

const center_cylinder_left = createShape([
  "Cylinder",
  base_cylinder_radius / 2,
  base_cylinder_radius / 2,
  2,
  round_cylinder,
]);
center_cylinder_left.position.set(-2, 7.5, 2.8);

const center_cylinder_roof_left = createShape([
  "Cone",
  base_cylinder_radius / 2 + 0.2,
  2,
  round_cylinder / 2,
]);

center_cylinder_roof_left.position.set(-2, 9, 2.8);

castle_center.add(
  center_box,
  center_box_roof,
  center_cylinder_right,
  center_cylinder_roof_right,
  center_cylinder_left,
  center_cylinder_roof_left
);

// //East
const castle_east = new THREE.Group();
const east_box = createShape(["Box", 5, 4, base_box_depth - 3]);
east_box.position.set(4.5, 5, 0);

const east_box_roof = createShape(["Cone", 3.8, 2, 4]);
east_box_roof.position.set(4.5, 8, 0);
east_box_roof.rotation.y = Math.PI * 0.25;

const east_cylinder = createShape([
  "Cylinder",
  base_cylinder_radius,
  base_cylinder_radius,
  9,
  round_cylinder,
]);
east_cylinder.position.set(2.8, 7.5, 1.25);

const east_cylinder_roof = createShape([
  "Cone",
  base_cylinder_radius + 0.2,
  3,
  round_cylinder / 2,
]);

east_cylinder_roof.position.set(2.8, 13, 1.25);

const east_cylinder_right = createShape([
  "Cylinder",
  base_cylinder_radius / 2,
  base_cylinder_radius / 2,
  2,
  round_cylinder,
]);
east_cylinder_right.position.set(6, 8.5);
castle_east.add(
  east_box,
  east_box_roof,
  east_cylinder,
  east_cylinder_roof,
  east_cylinder_right
);

const east_cylinder_right_roof = createShape([
  "Cone",
  base_cylinder_radius / 2 + 0.1,
  2,
  round_cylinder / 2,
]);

east_cylinder_right_roof.position.set(6, 10.5);

//catle elements
// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 4 + 0.01;

//Windows

const windowGlass = new THREE.Mesh(
  new THREE.CircleGeometry(0.8, 32),
  new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    transparent: true,
    alphaMap: windowOpacityTexture,
    aoMap: windowAmbientOcclusionTexture,
    displacementMap: windowHeightTexture,
    displacementScale: 0.1,
    opacity: 0.5,
    normalMap: windowNormalTexture,
    metalnessMap: windowMetalnessTexture,
    roughnessMap: windowRoughnessTexture,
  })
);

const glassLayer = new THREE.Mesh(
  new THREE.CircleGeometry(0.7, 32),
  new THREE.MeshStandardMaterial({
    color: "#000000",
  })
);

windowGlass.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(windowGlass.geometry.attributes.uv.array, 2)
);

windowGlass.position.y = 6;
windowGlass.position.z = 2.5 + 0.002;
glassLayer.position.y = 6;
glassLayer.position.z = 2.5 + 0.001;

const windowMetal = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 2),
  new THREE.MeshPhysicalMaterial({
    map: metalWindowColorTexture,
    transparent: true,
    alphaMap: metalWindowOpacityTexture,
    aoMap: metalWindowAmbientOcclusionTexture,
    displacementMap: metalWindowHeightTexture,
    displacementScale: 0.1,
    // opacity: 0.5,
    normalMap: metalWindowNormalTexture,
    metalnessMap: metalWindowMetalnessTexture,
    roughnessMap: metalWindowRoughnessTexture,
  })
);

windowMetal.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(windowMetal.geometry.attributes.uv.array, 2)
);

windowMetal.position.set(5, 5.5, 1.5 + 0.002);

const glassLayerMetal = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 2),
  new THREE.MeshStandardMaterial({
    color: "#000000",
  })
);

glassLayerMetal.position.set(5, 5.5, 1.5 + 0.001);

const windowMetal1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 2),
  new THREE.MeshPhysicalMaterial({
    map: metalWindowColorTexture,
    transparent: true,
    alphaMap: metalWindowOpacityTexture,
    aoMap: metalWindowAmbientOcclusionTexture,
    displacementMap: metalWindowHeightTexture,
    displacementScale: 0.1,
    // opacity: 0.5,
    normalMap: metalWindowNormalTexture,
    metalnessMap: metalWindowMetalnessTexture,
    roughnessMap: metalWindowRoughnessTexture,
  })
);

windowMetal1.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(windowMetal.geometry.attributes.uv.array, 2)
);

windowMetal1.position.set(7 + 0.002, 5.5, 0);
windowMetal1.rotation.y = Math.PI * 0.5;

const glassLayerMetal1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 2),
  new THREE.MeshStandardMaterial({
    color: "#000000",
  })
);

glassLayerMetal1.position.set(7 + 0.001, 5.5, 0);
glassLayerMetal1.rotation.y = Math.PI * 0.5;

castle.add(
  castle_base,
  castle_west,
  castle_center,
  castle_east,
  east_cylinder_right_roof,
  door,
  windowGlass,
  glassLayer,
  windowMetal,
  glassLayerMetal,
  windowMetal1,
  glassLayerMetal1
);

//Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 9 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;

  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    map: forestGroundColorTexture,
    aoMap: forestGroundAmbientOcclusionTexture,
    normalMap: forestGroundNormalTexture,
    roughnessMap: forestGroundRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.12);
moonLight.position.set(8, 10, 0);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 13);
doorLight.position.set(0, 1.5, 4.5);
castle.add(doorLight);

// Window light
const windowLight = new THREE.PointLight("#ff7d46", 3, 10);
windowLight.position.set(0, 7.5, 3);
castle.add(windowLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);
/**
 * Fog
 */
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
//0,10,30
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 30;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#3c4451");

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

console.log(renderer);

moonLight.castShadow = true;
doorLight.castShadow = true;
windowLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
castle.castShadow = true;

floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

windowLight.shadow.mapSize.width = 256;
windowLight.shadow.mapSize.height = 256;
windowLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 10;
  ghost1.position.z = Math.sin(ghost1Angle) * 10;
  ghost1.position.y = Math.sin(elapsedTime * 10);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 10;
  ghost2.position.z = Math.sin(ghost2Angle) * 10;
  ghost2.position.y = Math.sin(elapsedTime * 10) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * 2 * (8 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (8 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 8) + Math.sin(elapsedTime * 2.5);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Helper Functions
 */

function createShape(params) {
  //Box , Cylinder , Cone

  switch (params[0]) {
    case "Box":
      // width,height,depth
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(params[1], params[2], params[3]),
        new THREE.MeshStandardMaterial({
          map: wallColorTexture,
          aoMap: wallAmbientOcclusionTexture,
          displacementMap: wallHeightTexture,
          displacementScale: 0.1,
          normalMap: wallNormalTexture,
          roughnessMap: wallRoughnessTexture,
        })
      );

      box.geometry.setAttribute(
        "uv2",
        new THREE.Float32BufferAttribute(box.geometry.attributes.uv.array, 2)
      );
      wallColorTexture.repeat.set(8, 4);
      wallAmbientOcclusionTexture.repeat.set(8, 4);
      wallNormalTexture.repeat.set(8, 4);
      wallRoughnessTexture.repeat.set(8, 4);

      wallColorTexture.wrapS = THREE.RepeatWrapping;
      wallAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
      wallNormalTexture.wrapS = THREE.RepeatWrapping;
      wallRoughnessTexture.wrapS = THREE.RepeatWrapping;

      wallColorTexture.wrapT = THREE.RepeatWrapping;
      wallAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
      wallNormalTexture.wrapT = THREE.RepeatWrapping;
      wallRoughnessTexture.wrapT = THREE.RepeatWrapping;
      return box;
    case "Cylinder":
      // radius top,radius bottom, height,radialSegments
      const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(params[1], params[2], params[3], params[4]),
        new THREE.MeshStandardMaterial({
          map: cylinderColorTexture,
          aoMap: cylinderAmbientOcclusionTexture,
          displacementMap: cylinderHeightTexture,
          displacementScale: 0.1,
          normalMap: cylinderNormalTexture,
          roughnessMap: cylinderRoughnessTexture,
        })
      );
      cylinder.geometry.setAttribute(
        "uv2",
        new THREE.Float32BufferAttribute(
          cylinder.geometry.attributes.uv.array,
          2
        )
      );
      cylinderColorTexture.repeat.set(2, 2);
      cylinderAmbientOcclusionTexture.repeat.set(2, 2);
      cylinderNormalTexture.repeat.set(2, 2);
      cylinderRoughnessTexture.repeat.set(2, 2);

      cylinderColorTexture.wrapS = THREE.RepeatWrapping;
      cylinderAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
      cylinderNormalTexture.wrapS = THREE.RepeatWrapping;
      cylinderRoughnessTexture.wrapS = THREE.RepeatWrapping;

      cylinderColorTexture.wrapT = THREE.RepeatWrapping;
      cylinderAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
      cylinderNormalTexture.wrapT = THREE.RepeatWrapping;
      cylinderRoughnessTexture.wrapT = THREE.RepeatWrapping;
      return cylinder;
    case "Cone":
      //radius,height,redialSegments
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(params[1], params[2], params[3]),
        new THREE.MeshStandardMaterial({
          map: roofColorTexture,
          aoMap: roofAmbientOcclusionTexture,
          displacementMap: roofHeightTexture,
          displacementScale: 0.1,
          normalMap: roofNormalTexture,
          roughnessMap: roofRoughnessTexture,
        })
      );
      cone.geometry.setAttribute(
        "uv2",
        new THREE.Float32BufferAttribute(cone.geometry.attributes.uv.array, 2)
      );
      roofColorTexture.repeat.set(8, 8);
      roofAmbientOcclusionTexture.repeat.set(8, 8);
      roofNormalTexture.repeat.set(8, 8);
      roofRoughnessTexture.repeat.set(8, 8);

      roofColorTexture.wrapS = THREE.RepeatWrapping;
      roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
      roofNormalTexture.wrapS = THREE.RepeatWrapping;
      roofRoughnessTexture.wrapS = THREE.RepeatWrapping;

      roofColorTexture.wrapT = THREE.RepeatWrapping;
      roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
      roofNormalTexture.wrapT = THREE.RepeatWrapping;
      roofRoughnessTexture.wrapT = THREE.RepeatWrapping;
      return cone;
    default:
      // code block
      return;
  }
}
