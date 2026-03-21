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

const interactives = document.querySelectorAll('.hover-target, a, .glass-card, button');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});

// --- Mouse Spotlight on Cards ---
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// --- 3D Vanilla Tilt Cards ---
try {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        perspective: 1000,
        scale: 1.02
    });
} catch (e) {
    console.warn("VanillaTilt failed:", e);
}

// --- Text Scramble Cryptography Effect ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
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
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

let particleConfig = {
    color1: '#06b6d4', // Cyan
    color2: '#8b5cf6', // Violet
    spread: 8
};

function generateParticles() {
    const c1 = new THREE.Color(particleConfig.color1);
    const c2 = new THREE.Color(particleConfig.color2);

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Spherical distribution
        const r = particleConfig.spread * Math.cbrt(Math.random()); 
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = r * Math.cos(phi);

        // Mix colors randomly
        const mixedColor = c1.clone().lerp(c2, Math.random());
        colorArray[i] = mixedColor.r;
        colorArray[i+1] = mixedColor.g;
        colorArray[i+2] = mixedColor.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
}
generateParticles();

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
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
    particleMesh.rotation.y += 0.08 * (targetX - particleMesh.rotation.y);
    particleMesh.rotation.x += 0.08 * (targetY - particleMesh.rotation.x);
    
    // Constant slow rotation over time
    particleMesh.rotation.z = elapsedTime * 0.08;
    particleMesh.rotation.y += 0.003;

    // Camera scroll parallax
    camera.position.y = -scrollY * 0.006;
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP Advanced Scroll Animations & State Changes ---
gsap.registerPlugin(ScrollTrigger);

// 1. Hacker Text Scramble Triggers
document.querySelectorAll('.section-title').forEach(el => {
    // Store original text
    if(!el.dataset.text) el.dataset.text = el.innerText;
    const scrambler = new TextScramble(el);
    
    ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
            el.style.opacity = 1;
            scrambler.setText(el.dataset.text);
        }
    });
});

// 2. Ambient Background Glow Morphs
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

ScrollTrigger.create({
    trigger: "#skills",
    start: "top center",
    onEnter: () => {
        // Morph ambient glows to Matrix Green & Teal
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', duration: 1.5 });
        
        // Explode scale and spin 3D particles
        gsap.to(particleMesh.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 2.5, ease: "power3.out" });
        gsap.to(particleMesh.rotation, { x: Math.PI / 1.5, duration: 2.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
        // Revert to Violet & Blue
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', duration: 1.5 });
        
        gsap.to(particleMesh.scale, { x: 1, y: 1, z: 1, duration: 2.5, ease: "power3.inOut" });
        gsap.to(particleMesh.rotation, { x: 0, duration: 2.5 });
    }
});

ScrollTrigger.create({
    trigger: "#projects",
    start: "top center",
    onEnter: () => {
        // Morph to Deep Fushia / Violet
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', duration: 1.5 });
        
        // Pull camera back, hyper-spin particles
        gsap.to(camera.position, { z: 18, duration: 3, ease: "power4.out" });
        gsap.to(particleMesh.rotation, { y: "+=3.14", duration: 3, ease: "expo.out" });
        gsap.to(particleMesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 3 });
    },
    onLeaveBack: () => {
        // Back to Skills colors
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', duration: 1.5 });
        
        gsap.to(camera.position, { z: 12, duration: 2.5 });
        gsap.to(particleMesh.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 2.5 });
    }
});

ScrollTrigger.create({
    trigger: "#contact",
    start: "top center",
    onEnter: () => {
        // Morph to Ember/Orange
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)', duration: 1.5 });
        
        // Push camera way in
        gsap.to(camera.position, { z: 5, duration: 3, ease: "power3.inOut" });
    },
    onLeaveBack: () => {
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(camera.position, { z: 18, duration: 2.5 });
    }
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

// Hero intro
gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.5
});
