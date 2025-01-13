import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// compression method
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
// fonts
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/geometries/TextGeometry.js";

// Tshirt Variable
var CollarDesign = "null";
var CuffDesign = "null";
var placketDesing = "null";
var PocketDesing = "null";
var backShoulder = "null";
var BottomCut = "null";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

var TagHeght = window.innerHeight;
var TagWidth = window.innerWidth - 155;
var ViewModelTag = document.getElementById("ViewModel");

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

// Background texture load
const backgroudnTexture = new THREE.TextureLoader().load(
  "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/PDaTSuJ/videoblocks-particles-white-business-bright-glitter-bokeh-dust-abstract-background-loop_r2ey4hsdb_thumbnail-360_09.jpg"
);
scene.background = backgroudnTexture;

const light = new THREE.HemisphereLight(0xffffff, 0x080820, 4);
scene.add(light);

// add Loading manager
const loadingManager = new THREE.LoadingManager();
const progressbar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".PreloaderCover");

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  progressbar.value = (itemsLoaded / itemsTotal) * 100;
};
loadingManager.onLoad = function () {
  progressContainer.style.display = "none";
};

const loader = new GLTFLoader(loadingManager).setPath("components/");

// Initialize the DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
); // Provide the correct path to the Draco decoder

// Attach the DRACOLoader to the GLTFLoader
loader.setDRACOLoader(dracoLoader);

let CurruntMesh;
// Load Components
let CollarMesh;
let CuffMesh;
let PlacetMesh;
let PocketMesh;
let BackDetailsMesh;
let BottomCUtMesh;
let DummyMesh;

loader.load("Default/Default.glb", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);
  CurruntMesh = mesh;
});
loader.load("Default/Dummy.glb", (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);
  DummyMesh = mesh;
});

if (backShoulder == "null") {
  loader.load("BackDetails/No back details Back.glb", (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);
    BackDetailsMesh = mesh;
    backShoulder = "No back details Back";
  });
}

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
// document.getElementById("CuffOut").addEventListener("click", () => {
//   camera.position.x = 4.355445508251393;
//   camera.position.y = 2.676973612699726;
//   camera.position.z = -6.751303307894314;
//   controls.target = new THREE.Vector3(0, 6, 0);
//   // spotLight2.position.set(0, 15, -25);
// });

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
// document.getElementById("BottomCutClose").addEventListener("click", () => {
//   controls.target = new THREE.Vector3(0, 6, 0);
// });

// EventList for Load New Model
// Collar Types
document
  .getElementById("buisness Classic Collar")
  .addEventListener("click", () => {
    // loadNewMesh("varient/Business classic Collar/Business classic Collar.glb");
    CollarDesign = "Buisness Classic Collar";
    CollarChange(CollarDesign);
    alert("jkj");
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
  ChangeBackDetails(backShoulder);
});
document.getElementById("CenterfoldsBack").addEventListener("click", () => {
  backShoulder = "Center folds Back";
  ChangeBackDetails(backShoulder);
});
document.getElementById("NobackdetailsBack").addEventListener("click", () => {
  backShoulder = "No back details Back";
  ChangeBackDetails("No back details Back");
});
// Bottom Cut
document.getElementById("ClassicBottomCut").addEventListener("click", () => {
  BottomCut = "Classic Bottom Cut";
  ChangeBottomCut(BottomCut);
});
document.getElementById("ModernBottomCut").addEventListener("click", () => {
  BottomCut = "Moder nBottom Cut";
  ChangeBottomCut(BottomCut);
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
// document.getElementById("testButton").addEventListener("click", testButton);
// function testButton() {
//   document.getElementById("Collar_table_id").innerHTML = CollarDesign;
//   document.getElementById("placekt_table_id").innerHTML = placketDesing;
//   document.getElementById("pocket_table_id").innerHTML = PocketDesing;
//   document.getElementById("Back_Details_table_id").innerHTML = backShoulder;
//   document.getElementById("Bottom_cut_table_id").innerHTML = BottomCut;
// }

// Collar Change Function
function CollarChange(CollarDesign) {
  alert("Please wait");
  if (CollarDesign == "null") {
    scene.remove(CollarMesh);
  } else if (CollarDesign == "Buisness Classic Collar") {
    scene.remove(CollarMesh);
    loader.load("Collar/Business classic Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Button down classic Collar") {
    scene.remove(CollarMesh);
    loader.load("Collar/Button down classic Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Button Down modern Collar") {
    scene.remove(CollarMesh);
    loader.load("Collar/Button Down modern Collar.glb", (gltf) => {
      CollarMesh = gltf.scene; // Store the new mesh
      CollarMesh.position.set(0, 1.05, -1);
      scene.add(CollarMesh); // Add the new mesh to the scene
    });
  } else if (CollarDesign == "Cut away classic Collar") {
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
      backShoulder = "No back details Back";
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

// Change Back Details
function ChangeBackDetails(backDesign) {
  if (backDesign == "No back details Back") {
    scene.remove(BackDetailsMesh);
    loader.load("BackDetails/No back details Back.glb", (gltf) => {
      BackDetailsMesh = gltf.scene; // Store the new mesh
      BackDetailsMesh.position.set(0, 1.05, -1);
      scene.add(BackDetailsMesh); // Add the new mesh to the scene
    });
  } else if (backDesign == "Back waist darts Back") {
    scene.remove(BackDetailsMesh);
    loader.load("BackDetails/Back waist darts Back.glb", (gltf) => {
      BackDetailsMesh = gltf.scene; // Store the new mesh
      BackDetailsMesh.position.set(0, 1.05, -1);
      scene.add(BackDetailsMesh); // Add the new mesh to the scene
    });
  } else if (backDesign == "Center folds Back") {
    alert(backDesign);
    scene.remove(BackDetailsMesh);
    loader.load("BackDetails/Center folds Back.glb", (gltf) => {
      BackDetailsMesh = gltf.scene; // Store the new mesh
      BackDetailsMesh.position.set(0, 1.05, -1);
      scene.add(BackDetailsMesh); // Add the new mesh to the scene
    });
  }
}

// Change Bottom Cut
function ChangeBottomCut(bottomcutDesign) {
  if (bottomcutDesign == "Classic Bottom Cut") {
    alert(bottomcutDesign);
    scene.remove(BottomCUtMesh);
    loader.load("Bottom Cut/Classic Bottom Cut.glb", (gltf) => {
      BottomCUtMesh = gltf.scene; // Store the new mesh
      BottomCUtMesh.position.set(0, 1.05, -1);
      scene.add(BottomCUtMesh); // Add the new mesh to the scene
    });
  } else if (bottomcutDesign == "Moder nBottom Cut") {
    alert(bottomcutDesign);
    scene.remove(BottomCUtMesh);
    loader.load("Bottom Cut/Modern Bottom Cut.glb", (gltf) => {
      BottomCUtMesh = gltf.scene; // Store the new mesh
      BottomCUtMesh.position.set(0, 1.05, -1);
      scene.add(BottomCUtMesh); // Add the new mesh to the scene
    });
  }
}

document.getElementById("Black").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/black.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("brown").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/brown.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("cream").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/cream.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("gray").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/gray.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("navy").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/navy blue.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("red").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/red.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("yellow").addEventListener("click", () => {
  // Add Texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("./components/Texture/yellow.webp"); // Load your texture

  CurruntMesh.traverse(function (child) {
    if (child.isMesh) {
      // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
      child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
  });

  if (CollarDesign != "null") {
    CollarMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (placketDesing != "null") {
    PlacetMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
  if (PocketDesing != "null") {
    PocketMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (backShoulder != "null") {
    BackDetailsMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }

  if (BottomCut != "null") {
    BottomCUtMesh.traverse(function (child) {
      if (child.isMesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Apply new material
        child.material = new THREE.MeshStandardMaterial({ map: texture });
      }
    });
  }
});

document.getElementById("TextAdding").addEventListener("click", () => {
  var TextValue = document.getElementById("CustomTextInput").value;
  var textColor = document.getElementById("textColor").value;

  CustomFontsLoading(TextValue, textColor);
});

var textMesh;

function CustomFontsLoading(text, color) {
  const LoadFonts = new FontLoader();

  if (textMesh != null) {
    scene.remove(textMesh);
  } 

  LoadFonts.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 0.06,
        // size: 1,
        depth: 0.01,
        curveSegments: 100,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: color });
      textMesh = new THREE.Mesh(geometry, textMaterial);

      // Position text
      textMesh.position.set(0.53, 6.698, 0.1);
      textMesh.rotateY(0.15);
      textMesh.rotateX(-0.4);

      scene.add(textMesh);
    }
  );
}

document.getElementById("TextRemove").addEventListener("click",()=>{
  document.getElementById('CustomTextInput').value = ''
  scene.remove(textMesh);
});
