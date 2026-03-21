// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Enlarge cursor on interactive elements
const interactives = document.querySelectorAll('.hover-target, a, .glass-card');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
    });
});

// --- 3D Vanilla Tilt Cards ---
try {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        perspective: 1000,
        scale: 1.02
    });
} catch (e) {
    console.warn("VanillaTilt failed to load:", e);
}

// --- Three.js 3D Particle Sphere ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Insert renderer cleanly into the DOM
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.pointerEvents = 'none';

// We want a highly aesthetic AI core - thousands of tiny points forming a sphere
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

const color1 = new THREE.Color('#06b6d4'); // Cyan
const color2 = new THREE.Color('#8b5cf6'); // Violet

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Spherical distribution
    const r = 8 * Math.cbrt(Math.random()); 
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
    posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
    posArray[i+2] = r * Math.cos(phi);

    // Mix colors randomly
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colorArray[i] = mixedColor.r;
    colorArray[i+1] = mixedColor.g;
    colorArray[i+2] = mixedColor.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);
camera.position.z = 12;

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Smooth rotation based on mouse movement
    particleMesh.rotation.y += 0.05 * (targetX - particleMesh.rotation.y);
    particleMesh.rotation.x += 0.05 * (targetY - particleMesh.rotation.x);
    
    // Constant slow rotation over time
    particleMesh.rotation.z = elapsedTime * 0.05;
    particleMesh.rotation.y += 0.002;

    // Camera scroll parallax (moving camera up as we scroll down)
    camera.position.y = -scrollY * 0.005;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP Advanced Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero intro
gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out"
});

// Staggered reveals for headers
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: { trigger: title, start: "top bottom-=100" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// Stagger skills
gsap.utils.toArray('.skills-grid .skill-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top bottom-=50" },
        y: 60, opacity: 0, duration: 1, ease: "power3.out", delay: (i % 4) * 0.15
    });
});

// Projects
gsap.utils.toArray('.projects-grid .project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top bottom-=100" },
        y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: (i % 2) * 0.2
    });
});

// Left/Right split for About
gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-container', start: "top bottom-=100" },
    x: -50, opacity: 0, duration: 1.2, ease: "power3.out"
});
gsap.from('.about-stats', {
    scrollTrigger: { trigger: '.about-container', start: "top bottom-=100" },
    x: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2
});

// Contact
gsap.from('.contact-content', {
    scrollTrigger: { trigger: '.contact-section', start: "top bottom-=100" },
    scale: 0.9, opacity: 0, duration: 1, ease: "power3.out"
});
