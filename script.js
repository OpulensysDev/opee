// Configuração básica da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Criar partículas
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10; // Partículas espalhadas
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

// Animação com GSAP
gsap.to(camera.position, {
  z: 3,
  duration: 3,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut",
});

// Loop de renderização
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
