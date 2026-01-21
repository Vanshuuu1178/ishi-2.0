// --- 1. Music Toggle Logic ---
const music = document.getElementById('bg-music');
const musicBtn = document.querySelector('.music-toggle');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.textContent = "🎵"; // Icon for 'Play'
        musicBtn.style.animation = "none";
    } else {
        music.play().catch(error => {
            console.log("Autoplay prevented. Interaction required.");
        });
        musicBtn.textContent = "⏸"; // Icon for 'Pause'
        musicBtn.style.animation = "wiggle 2s infinite";
    }
    isPlaying = !isPlaying;
}

// --- 2. Welcome Screen Logic ---
function enterSite() {
    const overlay = document.getElementById('welcome-overlay');

    // Fade out effect
    overlay.style.opacity = '0';

    // Remove from DOM after fade (so we can click things underneath)
    setTimeout(() => {
        overlay.style.display = 'none';

        // Try to start music automatically after interaction
        toggleMusic();
    }, 500);
}

// --- 3. Simple Image Fallback ---
// If her photo doesn't load, use a cute placeholder
window.addEventListener('load', function () {
    const img = document.getElementById('gf-photo');
    if (img) {
        img.onerror = function () {
            this.src = 'https://placehold.co/400x400/ffe4e1/ff69b4?text=Add+Her+Photo!';
            this.alt = "Please add her photo to the folder!";
        };
    }
});

function updateTimer() {
    // CHANGE THIS DATE to your actual anniversary
    const startDate = new Date("2023-01-01T00:00:00");
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML =
        `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs`;
}
setInterval(updateTimer, 1000);

document.addEventListener('mousemove', function (e) {
    // Create a heart every few movements to prevent lag
    if (Math.random() < 0.1) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp 1s ease-out forwards';
        document.body.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 1000);
    }
});

function enterSite() {
    // Simple prompt
    let answer = prompt("Security Question: What is my nickname for you?");

    // Convert to lowercase to make it case-insensitive
    if (answer && answer.toLowerCase() === "bhais") { // Change "bbg" to the real answer
        const overlay = document.getElementById('welcome-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            toggleMusic();
        }, 500);
    } else {
        alert("Access Denied! Only my real girlfriend knows this! 😤");
    }
}

const reasons = [
    "Your smile lights up my heart.",
    "You make the best jokes.",
    "You are incredibly kind to animals (ME).",
    "Your mwaaaa is my favorite sound.",
    "You always support me.",
    "You look cute even when you are angry!"
];

function showReason() {
    const display = document.getElementById('reason-display');
    const randomIndex = Math.floor(Math.random() * reasons.length);
    display.innerText = reasons[randomIndex];
    display.style.animation = "popIn 0.5s ease"; // Re-trigger animation
}

// Replace latitude and longitude with HER city's coordinates (Google "lat long of [City Name]")
const lat = 19.269514; // Example: Ahmedabad
const long = 76.771748;

async function getWeather() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
        const data = await response.json();
        const temp = data.current_weather.temperature;
        document.getElementById('weather-display').innerHTML =
            `It is currently <b>${temp}°C</b> there. <br> Don't forget to drink water! 💧`;
    } catch (error) {
        document.getElementById('weather-display').innerText = "Couldn't check the weather, but you're still hot! 🔥";
    }
}

// Run this when page loads
getWeather();

function unlockSecret() {
    const code = prompt("Enter the passcode (muhehehehehe):");
    if (code === "17") { // Change to your date
        document.getElementById('secret-content').style.display = 'block';
        alert("Access Granted! Welcome to the VIP zone.");
    } else {
        alert("Wrong code! Are you an imposter? 🤨");
    }
}

function createBubbles() {
    const container = document.getElementById('bubble-container');
    container.innerHTML = ''; // Clear existing
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.onclick = function () {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');
                // Optional: Play a tiny pop sound here if you want
            }
        };
        container.appendChild(bubble);
    }
}

// Initialize
createBubbles();
function resetBubbles() { createBubbles(); }

const textToType = "Hello Beautiful 🐱";
const typeWriterElement = document.getElementById('typewriter-text');
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150); // Speed of typing
    }
}

// Start typing when page loads
window.addEventListener('load', typeWriter);

function toggleTheme() {
    document.body.classList.toggle('sleep-mode');
    const btn = document.querySelector('.theme-toggle');

    if (document.body.classList.contains('sleep-mode')) {
        btn.textContent = "☀️"; // Change to Sun icon
    } else {
        btn.textContent = "🌙"; // Change back to Moon
    }
}

let score = 0;
const heart = document.getElementById('moving-heart');
const area = document.getElementById('game-area');

function catchHeart() {
    score++;
    document.getElementById('score').innerText = score;

    // Calculate random position within the box
    const x = Math.random() * (area.clientWidth - 40);
    const y = Math.random() * (area.clientHeight - 40);

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    // Funny messages at certain scores
    if (score === 5) alert("You're fast! ⚡");
    if (score === 10) alert("Okay, you win my heart! (Again) 🏆");
}

// Make it move automatically every 1 second to make it harder
setInterval(() => {
    const x = Math.random() * (area.clientWidth - 40);
    const y = Math.random() * (area.clientHeight - 40);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
}, 1000);


let heartbeatInterval;

function startHeartbeat() {
    // Check if browser supports vibration
    if (navigator.vibrate) {
        // Pattern: Vibrate 100ms, Pause 100ms, Vibrate 100ms, Pause 800ms
        // Simulates "Dub-Dub...... Dub-Dub"
        navigator.vibrate([100, 100, 100, 800]);

        // Repeat it
        heartbeatInterval = setInterval(() => {
            navigator.vibrate([100, 100, 100, 800]);
        }, 1100);
    } else {
        alert("Sorry, your device doesn't support vibration! 😢");
    }
}

function stopHeartbeat() {
    clearInterval(heartbeatInterval);
    navigator.vibrate(0); // Stop immediately
}

// --- THREE.JS GALAXY BACKGROUND ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha true lets us see your CSS background behind it if needed

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create Stars
const geometry = new THREE.BufferGeometry();
const count = 3000; // Number of stars
const positions = new Float32Array(count * 3); // x, y, z for each star

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Spread stars out
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Star Material (The look)
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xff69b4, // Hot Pink stars!
    transparent: true,
    opacity: 0.8,
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

camera.position.z = 2;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate the galaxy automatically
    stars.rotation.y = elapsedTime * 0.05;
    stars.rotation.x = elapsedTime * 0.02;

    // Move slightly with mouse (Parallax effect)
    stars.rotation.y += mouseX * 0.1;
    stars.rotation.x += mouseY * 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Handle Window Resize (So it doesn't stretch)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- PWA INSTALL LOGIC ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    deferredPrompt = e;

    // Create a button dynamically to ask her to install
    const installBtn = document.createElement('button');
    installBtn.innerText = "📲 Install Our App";
    installBtn.className = "btn";
    installBtn.style.position = "fixed";
    installBtn.style.top = "10px";
    installBtn.style.right = "10px";
    installBtn.style.zIndex = "2000";
    installBtn.style.background = "gold";
    installBtn.style.color = "black";

    document.body.appendChild(installBtn);

    installBtn.addEventListener('click', (e) => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});


function accessGranted() {
    const msg = document.getElementById('access-msg');
    const screen = document.getElementById('security-screen');
    const finger = document.getElementById('fingerprint');

    finger.innerHTML = "🔄";
    msg.style.opacity = 1;
    msg.innerText = "Scanning DNA... Match Found: 'The Cutest Girl'";
    msg.style.color = "var(--hk-pink)";

    setTimeout(() => {
        msg.innerText = "ACCESS GRANTED. Welcome, Princess.";
        screen.style.transition = "top 1s ease-in-out";
        screen.style.top = "-100%"; // Slide up

        // Start your music automatically here if you want!
        // toggleMusic(); 
    }, 2000);
}