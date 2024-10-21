import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Tshirt Variable
var CollarDesign = "null";
var CuffDesign = "null";
var placketDesing = "null";
var PocketDesing = "null";
var backShoulder = "null";
var BottomCut = "null";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

var TagHeght = window.innerHeight - 80;
var TagWidth = window.innerWidth - 300;
var ViewModelTag = document.getElementById("ViewModel");
console.log(ViewModelTag.inner);

renderer.setSize(TagWidth, TagHeght);
renderer.setClearColor(0xc0c0c0);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

ViewModelTag.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, TagWidth / TagHeght, 1, 1000);
var camarapre = camera.position.set(0, 5, 11); //(X,y,z)
// camera.lookAt(10, 10, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //smooth rotation
controls.enablePan = true; // cant move Object in the position
// controls.minDistance = 5; // minimum scroll distance
// controls.maxDistance = 20; //Maximum scroll distance
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 6, 0);
controls.update();

// set gradient background color
// Create a full-screen plane for gradient background
const backgroundGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);

const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: { value: new THREE.Color(0xffffff) }, // top color (light sky blue)
    color2: { value: new THREE.Color(0x37474f) }, // bottom color (dodger blue)
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;
    void main() {
          // Calculate distance from the center of the plane
      float dist = distance(vUv, vec2(0.5, 0.5));
      // Mix the colors based on the distance (creates the gradient)
      gl_FragColor = vec4(mix(color1, color2, dist), 1.0);
    
    }
  `,
  side: THREE.DoubleSide,
  depthTest: false,
  depthWrite: false,
});

const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(backgroundMesh);

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide,
});
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// Lights
// const spotLight = new THREE.SpotLight(0xffffff, 2000, 100, 0.22, 1); // (Color,LightPower,?,)
// spotLight.position.set(0, 25, 0); // (X,Y,?)
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);

// const spotLight2 = new THREE.SpotLight(0xffffff, 2000, 100, 0.22, 1); // (Color,LightPower,?,)
// spotLight2.position.set(0, 35, 25); // (X,Y,?)
// spotLight2.castShadow = true;
// spotLight2.shadow.bias = -0.0001;
// scene.add(spotLight2);

const light = new THREE.HemisphereLight(0xffffff, 0x080820, 4);
scene.add(light);

const loader = new GLTFLoader().setPath("components/");

let CurruntMesh;
// Load Components
let CollarMesh;
let CuffMesh;
let PlacetMesh;
let PocketMesh;

loader.load("Default/Default.glb", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);
  CurruntMesh = mesh;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  // console.log(camarapre);
}
animate();

// Back Shoulder
document.getElementById("backShoulder").addEventListener("click", () => {
  camera.position.x = 0.1149237734552059;
  camera.position.y = 10.486300068137131;
  camera.position.z = -9.989403257716669;
  // spotLight2.position.set(0, 35, -25);
});

// Collar
document.getElementById("CollarEnter").addEventListener("click", () => {
  camera.position.x = -0.28732161969905695;
  camera.position.y = 8.279765524843071;
  camera.position.z = 5.5731940384255685;
  // spotLight2.position.set(0, 35, 25);

  // controls.target = new THREE.Vector3(0, 8, 0);
});

// Cuff Type
document.getElementById("CuffEnter").addEventListener("click", () => {
  camera.position.x = 2.8845819847082947;
  camera.position.y = 3.3773423812670336;
  camera.position.z = -4.471342336474797;
  controls.target = new THREE.Vector3(0, 3, 0);
  // spotLight2.position.set(0, 15, -25);
});
document.getElementById("CuffOut").addEventListener("click", () => {
  camera.position.x = 4.355445508251393;
  camera.position.y = 2.676973612699726;
  camera.position.z = -6.751303307894314;
  controls.target = new THREE.Vector3(0, 6, 0);
  // spotLight2.position.set(0, 15, -25);
});

// Packet Type
document.getElementById("Packet").addEventListener("click", () => {
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;
  // spotLight2.position.set(0, 35, 25);
});

// Pocket Type
document.getElementById("Pocket").addEventListener("click", () => {
  camera.position.x = 1.9859445982794313;
  camera.position.y = 7.432068459214772;
  camera.position.z = 1.8911524251256462;
  // spotLight2.position.set(0, 35, 25);
});

// Bottom Cut Type
document.getElementById("BottomCut").addEventListener("click", () => {
  camera.position.x = 4.355445508251393;
  camera.position.y = 2.676973612699726;
  camera.position.z = -6.751303307894314;
  controls.target = new THREE.Vector3(0, 2, 0);
  // spotLight2.position.set(0, 15, -25);
});
// document.getElementById("BottomCutBody").addEventListener("mousemove", () => {
//   controls.target = new THREE.Vector3(0, 2, 0);
// });
// document.getElementById("BottomCutBody").addEventListener("mouseleave", () => {
//   controls.target = new THREE.Vector3(0, 6, 0);
// });
// document.getElementById("BottomCut").addEventListener("mouseleave", () => {
//   controls.target = new THREE.Vector3(0, 6, 0);
// });
document.getElementById("BottomCutClose").addEventListener("click", () => {
  controls.target = new THREE.Vector3(0, 6, 0);
});

// EventList for Load New Model
// Collar Types
document
  .getElementById("buisness Classic Collar")
  .addEventListener("click", () => {
    // loadNewMesh("varient/Business classic Collar/Business classic Collar.glb");
    CollarDesign = "Buisness Classic Collar";
    CollarChange(CollarDesign);
  });

document
  .getElementById("Button down classic Collar")
  .addEventListener("click", () => {
    CollarDesign = "Button down classic Collar";
    CollarChange(CollarDesign);
  });

// document
//   .getElementById("Button down classic Collar")
//   .addEventListener("click", () => {
//     CollarDesign = "Button down classic Collar";
//     CollarChange(CollarDesign);
//   });

document
  .getElementById("ButtonDownmodernCollar")
  .addEventListener("click", () => {
    CollarDesign = "Button Down modern Collar";
    CollarChange(CollarDesign);
  });

document
  .getElementById("CutawayclassicCollar")
  .addEventListener("click", () => {
    CollarDesign = "Cut away classic Collar";
    CollarChange(CollarDesign);
  });

document.getElementById("MOACollar").addEventListener("click", () => {
  CollarDesign = "MOA Collar";
  CollarChange("null");
});
// Cuff
document.getElementById("SingleButtonCuff").addEventListener("click", () => {
  CuffDesign = "Single Button Cuff";
  ChangeCuff(CuffDesign);
});
document.getElementById("DoubleButtonCuff").addEventListener("click", () => {
  CuffDesign = "Double Button Cuff";
  ChangeCuff(CuffDesign);
});

// Placket
document.getElementById("Button").addEventListener("click", () => {
  placketDesing = "Button Design";
  ChangePlacket(placketDesing);
});
document.getElementById("Tuxedoplacket").addEventListener("click", () => {
  placketDesing = "Tuxedo placket";
  ChangePlacket(placketDesing);
});
document.getElementById("Withoutplacket").addEventListener("click", () => {
  placketDesing = "Without placket";
  ChangePlacket(placketDesing);
});
document.getElementById("Withplacket").addEventListener("click", () => {
  placketDesing = "With placket";
  ChangePlacket(placketDesing);
});
// Pocket
document.getElementById("default").addEventListener("click", () => {
  PocketDesing = "No Pocket";
  ChangePocket(PocketDesing);
});
document.getElementById("withpocket").addEventListener("click", () => {
  PocketDesing = "With Pocket";
  ChangePocket(PocketDesing);
});
// Back Details
document.getElementById("BackwaistdartsBack").addEventListener("click", () => {
  backShoulder = "Back waist darts Back";
  LoadVarient();
});
document.getElementById("CenterfoldsBack").addEventListener("click", () => {
  backShoulder = "Center folds Back";
  LoadVarient();
});
document.getElementById("NobackdetailsBack").addEventListener("click", () => {
  backShoulder = "No back details Back";
  LoadVarient();
});
// Bottom Cut
document.getElementById("ClassicBottomCut").addEventListener("click", () => {
  BottomCut = "Classic Bottom Cut";
  LoadVarient();
});
document.getElementById("ModernBottomCut").addEventListener("click", () => {
  BottomCut = "Moder nBottom Cut";
  LoadVarient();
});

// Load Model Function
function loadNewMesh(modelName) {
  scene.remove(CurruntMesh);
  CurruntMesh.traverse((object) => {
    if (object.isMesh) {
      object.geometry.dispose();
      object.material.dispose();
    }
  });
  CurruntMesh = null;

  loader.load(modelName, (gltf) => {
    CurruntMesh = gltf.scene; // Store the new mesh
    CurruntMesh.position.set(0, 1.05, -1);
    scene.add(CurruntMesh); // Add the new mesh to the scene
  });
}

// Summery Button
document.getElementById("testButton").addEventListener("click", testButton);
function testButton() {
  document.getElementById("Collar_table_id").innerHTML = CollarDesign;
  document.getElementById("placekt_table_id").innerHTML = placketDesing;
  document.getElementById("pocket_table_id").innerHTML = PocketDesing;
  document.getElementById("Back_Details_table_id").innerHTML = backShoulder;
  document.getElementById("Bottom_cut_table_id").innerHTML = BottomCut;
}

document.getElementById("TestingMesh").addEventListener("click", () => {});

// Collar Change Function
function CollarChange(CollarDesign) {
  if (CollarDesign == "null") {
    scene.remove(CollarMesh);
  } else if (CollarDesign == "Buisness Classic Collar") {
    alert(CollarDesign);
    scene.remove(CollarMesh);
    loader.load("Collar/Business classic Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Button down classic Collar") {
    alert(CollarDesign);
    scene.remove(CollarMesh);
    loader.load("Collar/Button down classic Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Button Down modern Collar") {
    alert(CollarDesign);
    scene.remove(CollarMesh);
    loader.load("Collar/Button Down modern Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Cut away classic Collar") {
    alert(CollarDesign);
    scene.remove(CollarMesh);
    loader.load("Collar/Cut away classic Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  }
}

// Change Cuff Tpes
function ChangeCuff(cuffDesign) {
  if (cuffDesign == null) {
    scene.remove(CuffMesh);
  } else if (cuffDesign == "Single Button Cuff") {
    alert(cuffDesign);
    scene.remove(CuffMesh);
    loader.load("Cuff/Single button Cuff.glb", (gltf) => {
      CuffMesh = gltf.scene; // Store the new mesh
      CuffMesh.position.set(0, 1.05, -1);
      scene.add(CuffMesh); // Add the new mesh to the scene
    });
  } else if (cuffDesign == "Double Button Cuff") {
    alert(cuffDesign);
    scene.remove(CuffMesh);
    loader.load("Cuff/Double button Cuff.glb", (gltf) => {
      CuffMesh = gltf.scene; // Store the new mesh
      CuffMesh.position.set(0, 1.05, -1);
      scene.add(CuffMesh); // Add the new mesh to the scene
    });
  }
}

// change Placket Type

function ChangePlacket(placketDesign) {
  if (placketDesign == "null") {
    scene.remove(PlacetMesh);
  } else if (placketDesign == "Button Design") {
    alert(placketDesign);
    scene.remove(PlacetMesh);
    loader.load("Placket/Button.glb", (gltf) => {
      PlacetMesh = gltf.scene; // Store the new mesh
      PlacetMesh.position.set(0, 1.05, -1);
      scene.add(PlacetMesh); // Add the new mesh to the scene
    });
  } else if (placketDesign == "Tuxedo placket") {
    alert(placketDesign);
    scene.remove(PlacetMesh);
    loader.load("Placket/Tuxedo placket.glb", (gltf) => {
      PlacetMesh = gltf.scene; // Store the new mesh
      PlacetMesh.position.set(0, 1.05, -1);
      scene.add(PlacetMesh); // Add the new mesh to the scene
    });
  } else if (placketDesign == "Without placket") {
    alert(placketDesign);
    scene.remove(PlacetMesh);
    loader.load("Placket/Without placket.glb", (gltf) => {
      PlacetMesh = gltf.scene; // Store the new mesh
      PlacetMesh.position.set(0, 1.05, -1);
      scene.add(PlacetMesh); // Add the new mesh to the scene
    });
  } else if (placketDesign == "With placket") {
    alert(placketDesign);
    scene.remove(PlacetMesh);
    loader.load("Placket/With placket.glb", (gltf) => {
      PlacetMesh = gltf.scene; // Store the new mesh
      PlacetMesh.position.set(0, 1.05, -1);
      scene.add(PlacetMesh); // Add the new mesh to the scene
    });
  }
}

// Change Pocket Type
function ChangePocket(PocketDesing) {
  if (PocketDesing == "No Pocket") {
    alert(PocketDesing);
    scene.remove(PocketMesh);
  } else if (PocketDesing == "With Pocket") {
    alert(PocketDesing);
    scene.remove(PocketMesh);
    loader.load("Pocket/WithPocket.glb", (gltf) => {
      PocketMesh = gltf.scene; // Store the new mesh
      PocketMesh.position.set(0, 1.05, -1);
      scene.add(PocketMesh); // Add the new mesh to the scene
    });
  }
}