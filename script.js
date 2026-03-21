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

// --- Typewriter Effect Class ---
class Typewriter {
    constructor(el) {
        this.el = el;
        this.text = el.innerText;
        this.el.innerHTML = '';
        this.str = '';
        this.i = 0;
    }
    start() {
        if (this.i < this.text.length) {
            this.str += this.text.charAt(this.i);
            this.el.innerHTML = this.str + '<span class="cursor">_</span>';
            this.i++;
            setTimeout(() => this.start(), 20 + Math.random() * 70);
        } else {
            this.el.innerHTML = this.str; // Clean up
        }
    }
}

// --- Split Text Bounce Effect ---
function splitTextBounce(el) {
    const text = el.innerText;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(-50px)';
        el.appendChild(span);
        
        gsap.to(span, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "bounce.out",
            delay: i * 0.05
        });
    });
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

// Physics & Rendering Arrays
const particlesCount = 5000;
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

// Interactive Physics States
const basePositions = new Float32Array(particlesCount * 3);
const velocities = new Float32Array(particlesCount * 3);

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

        basePositions[i] = posArray[i];
        basePositions[i+1] = posArray[i+1];
        basePositions[i+2] = posArray[i+2];

        // Mix colors randomly
        const mixedColor = c1.clone().lerp(c2, Math.random());
        colorArray[i] = mixedColor.r;
        colorArray[i+1] = mixedColor.g;
        colorArray[i+2] = mixedColor.b;
        
        // Zero out velocities
        velocities[i] = 0;
        velocities[i+1] = 0;
        velocities[i+2] = 0;
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

// MASSIVE INTERACTIVITY: Repulsion Physics Shockwave on Click
window.addEventListener('click', () => {
    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Explode violently outward from the central 3D core
        const px = basePositions[i];
        const py = basePositions[i+1];
        const pz = basePositions[i+2];
        const magnitude = Math.sqrt(px*px + py*py + pz*pz) + 0.1;
        
        // Massive physical shockwave
        velocities[i] += (px / magnitude) * (Math.random() * 4 + 4);
        velocities[i+1] += (py / magnitude) * (Math.random() * 4 + 4);
        velocities[i+2] += (pz / magnitude) * (Math.random() * 4 + 4);
    }
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
    
    // WebGL Spring Physics Computation per frame
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Calculate tension towards original base position
        const dx = basePositions[i] - positions[i];
        const dy = basePositions[i+1] - positions[i+1];
        const dz = basePositions[i+2] - positions[i+2];

        // Apple spring force
        velocities[i] += dx * 0.04;
        velocities[i+1] += dy * 0.04;
        velocities[i+2] += dz * 0.04;

        // Apply friction dampening
        velocities[i] *= 0.88;
        velocities[i+1] *= 0.88;
        velocities[i+2] *= 0.88;

        // Apply velocities back to positions
        positions[i] += velocities[i];
        positions[i+1] += velocities[i+1];
        positions[i+2] += velocities[i+2];
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP Advanced Scroll Animations & Section Triggers ---
gsap.registerPlugin(ScrollTrigger);

// 1. UNIQUE: Hacker Text Scramble on About
const aboutTitle = document.querySelector('#about .section-title');
aboutTitle.style.opacity = 0;
aboutTitle.dataset.text = aboutTitle.innerText;
const scrambler = new TextScramble(aboutTitle);
ScrollTrigger.create({
    trigger: aboutTitle,
    start: "top 85%",
    once: true,
    onEnter: () => {
        aboutTitle.style.opacity = 1;
        scrambler.setText(aboutTitle.dataset.text);
    }
});

// 2. UNIQUE: Typewriter effect on Skills
const skillsTitle = document.querySelector('#skills .section-title');
skillsTitle.style.opacity = 0;
const typer = new Typewriter(skillsTitle);
ScrollTrigger.create({
    trigger: skillsTitle,
    start: "top 85%",
    once: true,
    onEnter: () => {
        skillsTitle.style.opacity = 1;
        typer.start();
    }
});

// 3. UNIQUE: Individual Split Bounce on Projects
const projectsTitle = document.querySelector('#projects .section-title');
projectsTitle.style.opacity = 0;
ScrollTrigger.create({
    trigger: projectsTitle,
    start: "top 85%",
    once: true,
    onEnter: () => {
        projectsTitle.style.opacity = 1;
        splitTextBounce(projectsTitle);
    }
});

// 4. UNIQUE: Elastic Overshoot Scale on Contact
const contactTitle = document.querySelector('#contact h2');
gsap.from(contactTitle, {
    scrollTrigger: { trigger: contactTitle, start: "top 85%", once: true },
    scale: 0,
    opacity: 0,
    ease: "elastic.out(1, 0.3)",
    duration: 1.5
});

// --- Ambient Background Glow Morphs & 3D Environment Shift ---
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

ScrollTrigger.create({
    trigger: "#skills",
    start: "top center",
    onEnter: () => {
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(particleMesh.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 2.5, ease: "power3.out" });
        gsap.to(particleMesh.rotation, { x: Math.PI / 1.5, duration: 2.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
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
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(camera.position, { z: 18, duration: 3, ease: "power4.out" });
        gsap.to(particleMesh.rotation, { y: "+=3.14", duration: 3, ease: "expo.out" });
        gsap.to(particleMesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 3 });
    },
    onLeaveBack: () => {
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
        gsap.to(glow1, { background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', duration: 1.5 });
        gsap.to(glow2, { background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)', duration: 1.5 });
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
        scrollTrigger: { trigger: card, start: "top bottom-=50", once: true },
        y: 60, opacity: 0, duration: 1, ease: "power3.out", delay: (i % 4) * 0.15
    });
});

// Projects
gsap.utils.toArray('.projects-grid .project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top bottom-=100", once: true },
        y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: (i % 2) * 0.2
    });
});

// Left/Right split for About
gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-container', start: "top bottom-=100", once: true },
    x: -50, opacity: 0, duration: 1.2, ease: "power3.out"
});
gsap.from('.about-stats', {
    scrollTrigger: { trigger: '.about-container', start: "top bottom-=100", once: true },
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
