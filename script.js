if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// --- Theme Toggle (Dark / Light) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark';
}
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggleBtn.textContent = isLight ? '🌙 Dark' : '☀️ Light';
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });
}

// --- Global Animation States ---

// --- Barba.js Seamless Page Routing ---
if(typeof barba !== "undefined") {
    barba.init({
        transitions: [{
            name: 'gsap-warp',
            leave(data) {
                if(window.triggerNexusWarp) window.triggerNexusWarp(true);
                return gsap.to('.barba-wipe', {
                    top: 0,
                    duration: 0.6,
                    ease: "power3.inOut"
                });
            },
            enter(data) {
                if(window.triggerNexusWarp) {
                    setTimeout(() => window.triggerNexusWarp(false), 800);
                }
                gsap.to('.barba-wipe', {
                    top: "-100%",
                    duration: 0.6,
                    ease: "power3.inOut",
                    onComplete: () => {
                        gsap.set('.barba-wipe', { top: '100%' });
                    }
                });
                
                window.scrollTo(0, 0);
                if(typeof lenis !== "undefined") {
                    lenis.scrollTo(0, {immediate: true});
                }
            }
        }]
    });
}



// --- Lenis Super Smooth Scroll Engine ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
});

// Hard-force exact origin immediately upon boot, overriding browser cache
window.scrollTo(0, 0);
lenis.scrollTo(0, {immediate: true});

// Force wipe scroll position before page unloads
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
    lenis.scrollTo(0, {immediate: true});
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- Cinematic Reveal Portfolio Animations ---
function initMotion() {
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. SplitType Character Reveals
    const splitTitles = new SplitType('.title, .section-title, .hero-content .subtitle', { types: 'chars' });
    
    gsap.from(splitTitles.chars, {
        scrollTrigger: {
            trigger: '.title, .section-title, .hero-content .subtitle',
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        stagger: 0.015,
        duration: 1,
        ease: "power4.out"
    });

    // 2. Ambient Background & Neural Spine Parallax
    const neuralSpine = document.getElementById('neural-spine');
    
    lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        const scrollPercent = (e.scroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update Neural Spine height and intensity
        if(neuralSpine) {
            neuralSpine.style.height = `${scrollPercent}%`;
            const glowIntensity = 15 + (scrollPercent * 0.2); // Intensify glow as you scroll down
            neuralSpine.style.boxShadow = `0 0 ${glowIntensity}px var(--accent-1), 0 0 ${glowIntensity * 2}px var(--accent-2)`;
        }

        // Subtle offset based on vertical scroll
        gsap.to('.glow-1', { y: e.scroll * 0.1, duration: 0.5, ease: "power1.out" });
        gsap.to('.glow-2', { y: -e.scroll * 0.1, duration: 0.5, ease: "power1.out" });
    });

    // Sync Tick
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    });
    gsap.ticker.lagSmoothing(0, 0);

    // 3. Magnetic Link Refinement
    if(typeof Shery !== "undefined" && window.innerWidth > 768) {
        Shery.makeMagnet("#theme-toggle, .nav-links a, .hero-buttons .btn, .open-drawer, .drawer-close");
    }

    // 4. Project Drawer Logic
    const drawer = document.getElementById('project-drawer');
    if(drawer) {
        const drawerTitle = drawer.querySelector('.drawer-title');
        const drawerStack = drawer.querySelector('.stack-list');
        const drawerDesc = drawer.querySelector('.drawer-description p');
        const drawerLink = drawer.querySelector('.drawer-link');
        const closeBtn = drawer.querySelector('.drawer-close');
        const overlay = drawer.querySelector('.drawer-overlay');

        const openDrawer = (e) => {
            const card = e.target.closest('.project-card');
            if(!card) return;
            const { title, stack, details, project } = card.dataset;
            
            drawerTitle.innerText = title;
            drawerStack.innerText = stack;
            drawerDesc.innerText = details;
            drawerLink.href = project === 'ai-property' ? 'case_study_pa.html' : 'https://house-price-predictor-ml-nh9zrtguvhpmhwsys9qexr.streamlit.app/';
            
            drawer.classList.remove('drawer-hidden');
            lenis.stop();
        };

        const closeDrawer = () => {
            drawer.classList.add('drawer-hidden');
            lenis.start();
        };

        document.querySelectorAll('.open-drawer').forEach(btn => btn.addEventListener('click', openDrawer));
        if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if(overlay) overlay.addEventListener('click', closeDrawer);
    }

    // 5. System Cleanup
}

// Initial Kick-off

// Initial Kick-off
initMotion();
lenis.stop(); // Freeze scrolling until preloader validates!

// --- Cinematic Neural Preloader ---
const loaderTexts = ["INITIALIZING NEURAL NET", "ALLOCATING TENSORS", "LOADING VECTOR DECK", "BYPASSING MAINFRAME", "BOOTING AI CORE"];
const loaderTextEl = document.querySelector('.preloader-text');
const loaderProgressEl = document.querySelector('.preloader-progress');
const loaderFillEl = document.querySelector('.preloader-bar-fill');

let loaderState = { val: 0 };
gsap.to(loaderState, {
    val: 100,
    duration: 2.2,
    ease: "power1.inOut",
    onUpdate: () => {
        if(loaderProgressEl) {
            loaderProgressEl.innerText = Math.round(loaderState.val) + "%";
            loaderFillEl.style.width = loaderState.val + "%";
            if(Math.round(loaderState.val) % 20 === 0) {
                loaderTextEl.innerText = loaderTexts[Math.floor(Math.random() * loaderTexts.length)];
            }
        }
    },
    onComplete: () => {
        if(loaderTextEl) {
            loaderTextEl.innerText = "SYSTEM ONLINE";
            gsap.to('#preloader', {
                y: "-100%", 
                duration: 1,
                ease: "expo.inOut",
                delay: 0.3,
                onComplete: () => {
                    lenis.start(); 
                    // Trigger Hero instantly upon wipe completion, mathematically un-locked
                    gsap.from(".hero-content > *", {
                        y: 80, opacity: 0, duration: 1.8, stagger: 0.15, ease: "expo.out"
                    });
                }
            });
        }
    }
});

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


// --- Global Ambient Neural Nexus (The "TRUE" Background) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1';
renderer.domElement.style.pointerEvents = 'none';

// ─── Nexus Core Geometry (3D Architecture) ───
const nexusGeometry = new THREE.TorusKnotGeometry(12, 3, 250, 32, 2, 3);

// Layer 1: Main Core (Lavender)
const nexusMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xc084fc, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.18,
    blending: THREE.AdditiveBlending
});
const aiCore = new THREE.Mesh(nexusGeometry, nexusMaterial);
scene.add(aiCore);

// Layer 2: Chromatic Offset (Gold/Yellow)
const aiCoreOffset = new THREE.Mesh(
    nexusGeometry,
    new THREE.MeshBasicMaterial({ color: 0xfacc15, wireframe: true, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending })
);
aiCoreOffset.scale.set(1.02, 1.02, 1.02);
scene.add(aiCoreOffset);

// Data Nodes (Particles on the core surface)
const nodeCount = 600;
const nodeGeo = new THREE.BufferGeometry();
const nodePosArray = new Float32Array(nodeCount * 3);
const vertices = nexusGeometry.attributes.position.array;
for(let i=0; i<nodeCount; i++) {
    const vIdx = Math.floor(Math.random() * (vertices.length / 3)) * 3;
    nodePosArray[i*3] = vertices[vIdx];
    nodePosArray[i*3+1] = vertices[vIdx+1];
    nodePosArray[i*3+2] = vertices[vIdx+2];
}
nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));
const nodeMaterial = new THREE.PointsMaterial({ size: 0.15, color: 0xffffff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
const nexusNodes = new THREE.Points(nodeGeo, nodeMaterial);
aiCore.add(nexusNodes);

// Floating ambient particles (Global Storm)
const ambientParticleCount = 2000;
const ambientPosArray = new Float32Array(ambientParticleCount * 3);
for(let i=0; i<ambientParticleCount*3; i++){
    ambientPosArray[i] = (Math.random() - 0.5) * 150;
}
const ambientParticleGeometry = new THREE.BufferGeometry();
ambientParticleGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPosArray, 3));
const ambientParticleMaterial = new THREE.PointsMaterial({
    size: 0.1, color: 0x8b5cf6, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending
});
const ambientParticles = new THREE.Points(ambientParticleGeometry, ambientParticleMaterial);
scene.add(ambientParticles);

// Vertical Data Streams (falling)
const streamCount = 400;
const streamPosArray = new Float32Array(streamCount * 3);
for(let i=0; i<streamCount; i++) {
    streamPosArray[i*3] = (Math.random() - 0.5) * 120; // X
    streamPosArray[i*3+1] = (Math.random() - 0.5) * 120; // Y
    streamPosArray[i*3+2] = (Math.random() - 0.5) * 60; // Z
}
const streamGeo = new THREE.BufferGeometry();
streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPosArray, 3));
const streamMaterial = new THREE.PointsMaterial({ size: 0.06, color: 0xc084fc, transparent: true, opacity: 0.4 });
const streams = new THREE.Points(streamGeo, streamMaterial);
scene.add(streams);

camera.position.z = 40;
// Position core to the right for Hero layout balance
aiCore.position.x = 18; 

// Initial States
let isWarping = false;
window.triggerNexusWarp = (active) => { isWarping = active; };

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
    
    const time = Date.now() * 0.001;
    const warpSpeed = isWarping ? 15 : 1;

    // Movement: Auto-spin + Mouse reaction
    aiCore.rotation.x += (0.001 + globalMouseY * 0.005) * warpSpeed;
    aiCore.rotation.y += (0.002 + globalMouseX * 0.005) * warpSpeed;
    aiCore.rotation.z += 0.0005 * warpSpeed;
    
    aiCoreOffset.rotation.copy(aiCore.rotation);
    aiCoreOffset.rotation.y += 0.001 * warpSpeed; // Chromatic Lag

    // Parallax & Positioning
    // Move up as we scroll but at a deep layer (0.04 multiplier)
    aiCore.position.y = (window.innerWidth < 768) ? 0 : (-scrollY * 0.04);
    aiCore.position.x = (window.innerWidth < 768) ? 0 : 18; // Center on mobile, right on desktop

    // Ambient Storm Drift
    ambientParticles.rotation.y += 0.0003 * warpSpeed;
    
    // Data Stream Fall logic
    const streamPos = streamGeo.attributes.position.array;
    for (let i = 0; i < streamCount; i++) {
        const i3 = i * 3 + 1;
        streamPos[i3] -= (0.15 + Math.random() * 0.1) * warpSpeed;
        if(streamPos[i3] < -60) streamPos[i3] = 60;
    }
    streamGeo.attributes.position.needsUpdate = true;

    // Subtle Breathing
    aiCore.scale.setScalar(1 + Math.sin(time) * 0.04);
    aiCoreOffset.scale.setScalar(1.02 + Math.sin(time + 0.5) * 0.04);

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
        this.chars = 'アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ10101010';
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

// 1. Hero Reveal (Triggered Dynamically by Preloader completion array now)
// Kept blank gracefully without firing twice.

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

// --- UNIX Terminal Easter Egg ---
const termBtn = document.querySelector('.terminal-btn');
const termModal = document.getElementById('terminal-modal');
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

if(termBtn && termModal) {
    termBtn.addEventListener('click', () => {
        termModal.classList.toggle('terminal-hidden');
        if(!termModal.classList.contains('terminal-hidden')) {
            setTimeout(() => termInput.focus(), 100);
        }
    });

    termInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase();
            if(!cmd) return;
            
            const echoLine = document.createElement('p');
            echoLine.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${cmd}`;
            termOutput.appendChild(echoLine);
            
            const responseLine = document.createElement('p');
            responseLine.style.color = "var(--text-secondary)";
            
            switch(cmd) {
                case 'help':
                    responseLine.innerHTML = "commands:<br>whoami - Print current user<br>ls - List directory contents<br>cat resume.pdf - Display resume<br>clear - Clear terminal<br>exit - Close terminal";
                    break;
                case 'whoami':
                    responseLine.innerText = "Srijit Kumar Roy - ML/AI Engineer & Architect.";
                    break;
                case 'ls':
                    responseLine.innerHTML = "<span style='color: var(--accent-1);'>projects/</span>  <span style='color: var(--accent-1);'>skills/</span>  resume.pdf  core.sh";
                    break;
                case 'cat resume.pdf':
                    responseLine.innerText = "Mock download triggered. Accessing secure credential blocks... Opening resume.";
                    setTimeout(() => window.open('resume.html', '_blank'), 600);
                    break;
                case 'sudo rm -rf /':
                    responseLine.style.color = "#ef4444";
                    responseLine.innerText = "Permission denied. Nice try.";
                    break;
                case 'clear':
                    termOutput.innerHTML = '';
                    termInput.value = '';
                    return;
                case 'exit':
                    termModal.classList.add('terminal-hidden');
                    termInput.value = '';
                    return;
                default:
                    responseLine.style.color = "#ef4444";
                    responseLine.innerText = `Command not found: ${cmd}`;
            }
            
            termOutput.appendChild(responseLine);
            termInput.value = '';
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });
}

// --- Live ML Sandbox Inference Engine ---
const moneyTracker = { val: 500000 };
const sliderSqft = document.getElementById('slider-sqft');
const sliderBeds = document.getElementById('slider-beds');
const sliderAge = document.getElementById('slider-age');

const valSqft = document.getElementById('val-sqft');
const valBeds = document.getElementById('val-beds');
const valAge = document.getElementById('val-age');
const outputPred = document.getElementById('ml-prediction');

function executeMLInference() {
    if(!sliderSqft) return;
    
    const sqft = parseInt(sliderSqft.value);
    const beds = parseInt(sliderBeds.value);
    const age = parseInt(sliderAge.value);
    
    valSqft.innerText = sqft;
    valBeds.innerText = beds;
    valAge.innerText = age;
    
    // Multiple Linear Regression Weights Mapping (Bay Area Base Logic)
    const inferenceTarget = 100000 + (sqft * 320.5) + (beds * 45000) - (age * 3000);
    
    // Dynamic GPU-Accelerated Number Spinner
    gsap.to(moneyTracker, {
        val: inferenceTarget,
        duration: 0.8,
        ease: "power3.out",
        onUpdate: () => {
            outputPred.innerText = "$" + Math.round(moneyTracker.val).toLocaleString();
        }
    });
}

if(sliderSqft) {
    sliderSqft.addEventListener('input', executeMLInference);
    sliderBeds.addEventListener('input', executeMLInference);
    sliderAge.addEventListener('input', executeMLInference);
    executeMLInference(); // Init Default State
}

// --- Shery.js Advanced Kinematics & WebGL ---
if(typeof Shery !== "undefined" && window.innerWidth > 768) {
    // 1. Gelatinous Skew Cursor
    Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
    
    // 2. Universal GSAP Magnetic DOM Snapping
    Shery.makeMagnet(".nav-links a, .hero-buttons .btn, .social-links a, .terminal-btn");

    // 3. WebGL Liquid Image Distortions
    Shery.imageEffect(".glsl-img", {
        style: 5,
        config: {"a":{"value":2,"range":[0,30]},"b":{"value":-0.95,"range":[-1,1]},"zindex":{"value":10},"aspect":{"value":2.1},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.3,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.002,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true
    });
}
