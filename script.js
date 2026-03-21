// --- Lenis Super Smooth Scroll Engine ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0, 0);

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

const interactives = document.querySelectorAll('.hover-target, a, button, #physics-canvas-container');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});

// --- Mouse Internal Spotlight on Cards ---
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
        max: 5, 
        speed: 600,
        glare: true,
        "max-glare": 0.1,
        perspective: 1500,
        scale: 1.01
    });
} catch (e) {
    console.warn("VanillaTilt failed:", e);
}


// --- Global Ambient AI Core (The SOUL of the site) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Inject safely at the back of the DOM
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
renderer.domElement.style.pointerEvents = 'none';

// A massive, intricate Wireframe Torus Knot as the "AI Brain"
const coreGeometry = new THREE.TorusKnotGeometry(14, 2.5, 300, 20, 3, 5);
const coreMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xc084fc, // Lavender Purple Accent
    wireframe: true, 
    transparent: true, 
    opacity: 0.15
});
const aiCore = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(aiCore);
camera.position.z = 35;

// Floating ambient particles for extra cyber-soul
const ambientParticleGeometry = new THREE.BufferGeometry();
const ambientParticleCount = 1500;
const ambientPosArray = new Float32Array(ambientParticleCount * 3);
for(let i=0; i<ambientParticleCount*3; i++){
    ambientPosArray[i] = (Math.random() - 0.5) * 120;
}
ambientParticleGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPosArray, 3));
const ambientParticleMaterial = new THREE.PointsMaterial({
    size: 0.08,
    color: 0x8b5cf6, // Deep violet
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
});
const ambientParticles = new THREE.Points(ambientParticleGeometry, ambientParticleMaterial);
scene.add(ambientParticles);

let scrollY = window.scrollY;
lenis.on('scroll', (e) => { scrollY = e.targetScroll; });

let globalMouseX = 0;
let globalMouseY = 0;
window.addEventListener('mousemove', (e) => {
    globalMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateCore() {
    requestAnimationFrame(animateCore);
    
    // Core auto-spin
    aiCore.rotation.x += 0.001;
    aiCore.rotation.y += 0.002;
    aiCore.rotation.z += 0.0005;

    // Subtle ambient particle spin
    ambientParticles.rotation.y += 0.0005;

    // React deeply to mouse dragging globally
    aiCore.rotation.x += globalMouseY * 0.01;
    aiCore.rotation.y += globalMouseX * 0.01;
    
    // Core reacts heavily to timeline scrolling (moves up rapidly as you scroll down)
    aiCore.position.y = -scrollY * 0.01;
    
    // Subtle breathing pulse
    const time = Date.now() * 0.001;
    aiCore.scale.setScalar(1 + Math.sin(time) * 0.03);

    renderer.render(scene, camera);
}
animateCore();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- GSAP Horizontal Timeline & BOOM BAM Effects ---
const horizontalContainer = document.querySelector('.horizontal-container');
if(horizontalContainer) {
    const getScrollAmount = () => horizontalContainer.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(horizontalContainer, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1, 
            pin: true
        }
    });

    // Animate the tracking line fill flawlessly relative to exact panel bounds
    gsap.to('.timeline-progress-fill', {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1
        }
    });

    // Roll tracking ball seamlessly to absolute 100% position
    gsap.to('.timeline-rolling-ball', {
        left: "100%",
        rotation: 1080, 
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-section",
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1
        }
    });

    // THE BOOM BAM Container Animations!
    gsap.utils.toArray('.timeline-panel').forEach((panel, i) => {
        gsap.from(panel, {
            scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween, 
                start: "left 90%", // Entry pop trigger
                toggleActions: "play none none reverse"
            },
            z: 800, 
            rotationY: -60, 
            rotationX: 30, 
            scale: 0.1,
            opacity: 0,
            duration: 2.5,
            ease: "elastic.out(1, 0.3)", 
            boxShadow: "0 0 150px rgba(192, 132, 252, 1)" 
        });
    });
}
// ----------------------------------------


// --- Text Scramble & Typewriter Classes ---
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

class Typewriter {
    constructor(el) {
        this.el = el;
        this.text = el.innerText;
        this.el.innerHTML = '';
        this.str = '';
        this.i = 0;
        this.running = false;
        this.timeout = null;
    }
    start() {
        if(this.running) return;
        this.running = true;
        this.el.style.opacity = 1;
        this.type();
    }
    type() {
        if(!this.running) return;
        if (this.i < this.text.length) {
            this.str += this.text.charAt(this.i);
            this.el.innerHTML = this.str + '<span class="cursor">_</span>';
            this.i++;
            this.timeout = setTimeout(() => this.type(), 30 + Math.random() * 80);
        } else {
            this.el.innerHTML = this.str; 
            this.running = false;
        }
    }
    reset() {
        this.running = false;
        clearTimeout(this.timeout);
        this.str = '';
        this.i = 0;
        this.el.innerHTML = '';
        this.el.style.opacity = 0;
    }
}

// --- Matter.js Physics Invisible Jar & Intense Magnetic Scatter ---
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

const engine = Engine.create();
engine.world.gravity.y = 0.8; // Heavy but realistic float

const container = document.getElementById('physics-canvas-container');
let cWidth = container.clientWidth;
let cHeight = container.clientHeight;

const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: cWidth,
        height: cHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
});

// The Invisible Vault Walls
const wallOptions = { isStatic: true, render: { visible: false } };
let ground = Bodies.rectangle(cWidth / 2, cHeight + 50, cWidth + 200, 100, wallOptions);
let ceiling = Bodies.rectangle(cWidth / 2, -50, cWidth + 200, 100, wallOptions); // The LID locking them in
let leftWall = Bodies.rectangle(-50, cHeight / 2, 100, cHeight * 2, wallOptions);
let rightWall = Bodies.rectangle(cWidth + 50, cHeight / 2, 100, cHeight * 2, wallOptions);
World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

// Skill Balls Data
const rawSkills = ['Python', 'C++', 'SQL', 'TensorFlow', 'PyTorch', 'Scikit', 'Docker', 'AWS', 'FastAPI', 'Pandas', 'NumPy', 'Git'];
const skillBodies = [];

// Create Hyper-Realistic Glass Balls
rawSkills.forEach((skill, i) => {
    const radius = 45 + Math.random() * 20;
    const x = Math.random() * (cWidth - 100) + 50;
    const y = 100 + Math.random() * (cHeight - 200); 
    
    // Create physical body layer
    const body = Bodies.circle(x, y, radius, {
        restitution: 0.9, // Professional bounce without endless noise
        friction: 0.005,
        frictionAir: 0.015,
        density: 0.05,
        render: { visible: false } 
    });
    
    // Create DOM element overlay mapped to physics
    const ballDiv = document.createElement('div');
    ballDiv.classList.add('skill-ball');
    ballDiv.innerText = skill;
    container.appendChild(ballDiv);
    
    skillBodies.push({ body, elem: ballDiv, radius });
    World.add(engine.world, body);
});

// Add Intense Magnetic Scrambling Field from the user's cursor
let hoverMouseX = null;
let hoverMouseY = null;
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    hoverMouseX = e.clientX - rect.left;
    hoverMouseY = e.clientY - rect.top;
});
container.addEventListener('mouseleave', () => {
    hoverMouseX = null;
    hoverMouseY = null;
});

Matter.Events.on(engine, 'beforeUpdate', function() {
    if (hoverMouseX !== null && hoverMouseY !== null) {
        skillBodies.forEach(({ body }) => {
            const dx = body.position.x - hoverMouseX;
            const dy = body.position.y - hoverMouseY;
            const distSq = dx * dx + dy * dy;
            
            // If mouse triggers massive field (Radius of 150px)
            if (distSq < 22500) {
                // Apply a controlled repulsion force outward
                const forceMagnitude = 0.00015 * (22500 - distSq);
                Matter.Body.applyForce(body, body.position, {
                    x: (dx / Math.sqrt(distSq)) * forceMagnitude,
                    y: (dy / Math.sqrt(distSq)) * forceMagnitude
                });
            }
        });
    }
});

// Fallback to allow pure dragging physics
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.1, render: { visible: false } }
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse; 

// Do not intercept native page scrolling
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

Matter.Runner.run(engine);

// Sync Physics with DOM
Matter.Events.on(engine, 'afterUpdate', function() {
    skillBodies.forEach(({ body, elem, radius }) => {
        elem.style.width = `${radius * 2}px`;
        elem.style.height = `${radius * 2}px`;
        elem.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px) rotate(${body.angle}rad)`;
    });
});

// React to window resizes properly
window.addEventListener('resize', () => {
    cWidth = container.clientWidth;
    cHeight = container.clientHeight;
    render.canvas.width = cWidth;
    render.canvas.height = cHeight;
    Matter.Body.setPosition(ground, { x: cWidth / 2, y: cHeight + 50 });
    Matter.Body.setPosition(ceiling, { x: cWidth / 2, y: -50 });
    Matter.Body.setPosition(rightWall, { x: cWidth + 50, y: cHeight / 2 });
});


// --- GSAP Standard Vertical Section Reveals ---

// 1. Hero Reveal
gsap.from(".hero-content > *", {
    y: 80,
    opacity: 0,
    duration: 1.8,
    stagger: 0.15,
    ease: "expo.out",
    delay: 0.2
});

// 2. About - Scrambler text
const aboutTitle = document.querySelector('#about .section-title');
aboutTitle.style.opacity = 0;
aboutTitle.dataset.text = aboutTitle.innerText;
const scrambler = new TextScramble(aboutTitle);
ScrollTrigger.create({
    trigger: aboutTitle,
    start: "top 85%",
    onEnter: () => {
        aboutTitle.style.opacity = 1;
        scrambler.setText(aboutTitle.dataset.text);
    },
    onLeaveBack: () => {
        aboutTitle.style.opacity = 0;
    }
});

// 3. Skills - Typewriter heading
const skillsTitle = document.querySelector('#skills .section-title');
skillsTitle.style.opacity = 0;
const typer = new Typewriter(skillsTitle);

ScrollTrigger.create({
    trigger: '#skills',
    start: "top 60%", 
    onEnter: () => {
        typer.start();
    },
    onLeaveBack: () => {
        typer.reset();
    }
});

// 4. Projects - Fallback
const projectsTitle = document.querySelector('#projects .section-title');
gsap.from(projectsTitle, {
    scrollTrigger: { 
        trigger: projectsTitle, 
        start: "top 85%",
        toggleActions: "play none none reset"
    },
    y: 100,
    opacity: 0,
    rotationX: -45,
    duration: 1.5,
    ease: "power3.out"
});

document.querySelectorAll('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { 
            trigger: card, 
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power4.out", 
        delay: i * 0.2
    });
});

// 5. Contact - Slow Letter by Letter fade forever replayable
const contactTitle = document.querySelector('.contact-content h2');
const contactText = contactTitle.innerText;
contactTitle.innerHTML = '';
contactText.split('').forEach(char => {
    const span = document.createElement('span');
    span.innerText = char === ' ' ? '\u00A0' : char;
    contactTitle.appendChild(span);
});

gsap.from('.contact-content h2 span', {
    scrollTrigger: { 
        trigger: contactTitle, 
        start: "top 85%",
        toggleActions: "play none none reset" 
    },
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
    duration: 1,
    stagger: 0.05,
    ease: "power2.out"
});

gsap.from('.contact-content p, .contact-content .btn, .social-links', {
    scrollTrigger: { 
        trigger: contactTitle, 
        start: "top 70%",
        toggleActions: "play none none reset" 
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out"
});
