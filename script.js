import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-database.js";
import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzv828VQ5i5xO4Viw4rxFYerm8a7VNZas",
  authDomain: "opeecejc.firebaseapp.com",
  databaseURL: "https://opeecejc-default-rtdb.firebaseio.com",
  projectId: "opeecejc",
  storageBucket: "opeecejc.appspot.com",
  messagingSenderId: "358334760830",
  appId: "1:358334760830:web:2b56b2a752484e4a8ad52f",
  measurementId: "G-29KB4FHZHN",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para obter IP do usuário
async function getUserIP() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

// Verificar ou cadastrar IP no Firebase
async function checkOrRegisterIP(ip) {
  const dbRef = ref(database);
  const ipRef = child(dbRef, `ips/${ip}`);
  
  const snapshot = await get(ipRef);
  if (!snapshot.exists()) {
    await set(ipRef, { registeredAt: new Date().toISOString() });
    console.log("IP registrado:", ip);
  } else {
    console.log("IP já registrado:", ip);
  }
}

// Tela de carregamento com animação
function initLoadingScreen() {
  const progressElem = document.getElementById("progress");
  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += 1;
    progressElem.textContent = `${progress}%`;
    if (progress === 100) {
      clearInterval(progressInterval);
      window.location.href = "home.html";
    }
  }, 60); // 60ms * 100 = 6 segundos
}

// Fundo 3D com partículas
function createBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#background") });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.position.z = 5;

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Distribuição aleatória
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: "#00ff00", // Verde
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  animate();

  // Responsividade
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Inicialização da aplicação
(async function initApp() {
  const userIP = await getUserIP();
  await checkOrRegisterIP(userIP);
  createBackground();
  initLoadingScreen();
})();
