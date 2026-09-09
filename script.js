const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const world = document.getElementById("world");

const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("letter");
const closeBtn = document.getElementById("closeBtn");

const music = document.getElementById("music");

/* =========================
   START
========================= */

startBtn.addEventListener("click", () => {

    intro.classList.add("hidden");
    world.classList.remove("hidden");

    // Musik mulai setelah user menekan tombol
    music.play().catch(() => {});

});

/* =========================
   LETTER
========================= */

letterBtn.addEventListener("click", () => {
    letter.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    letter.classList.add("hidden");
});

/* Klik luar kotak surat */

letter.addEventListener("click", (e) => {

    if (e.target === letter) {
        letter.classList.add("hidden");
    }

});

/* =========================
   TOUCH / MOUSE EFFECT
========================= */

const space = document.querySelector(".space");

let startX = 0;
let startY = 0;

let rotateX = 0;
let rotateY = 0;

function moveScene(x, y) {

    rotateY += x * 0.08;
    rotateX -= y * 0.08;

    rotateX = Math.max(-15, Math.min(15, rotateX));

    space.style.transform =
        `translate(-50%, -47%)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;
}

/* TOUCH */

document.addEventListener("touchstart", (e) => {

    if (e.touches.length !== 1) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

});

document.addEventListener("touchmove", (e) => {

    if (e.touches.length !== 1) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const dx = x - startX;
    const dy = y - startY;

    moveScene(dx, dy);

    startX = x;
    startY = y;

});

/* MOUSE */

let mouseDown = false;

document.addEventListener("mousedown", (e) => {

    mouseDown = true;

    startX = e.clientX;
    startY = e.clientY;

});

document.addEventListener("mouseup", () => {

    mouseDown = false;

});

document.addEventListener("mousemove", (e) => {

    if (!mouseDown) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    moveScene(dx, dy);

    startX = e.clientX;
    startY = e.clientY;

});

/* =========================
   RANDOM PARTICLES
========================= */

function createParticle() {

    const particle = document.createElement("div");

    particle.innerHTML = Math.random() > 0.5 ? "✨" : "•";

    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.opacity = Math.random();
    particle.style.fontSize = (Math.random() * 8 + 5) + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";

    document.body.appendChild(particle);

    const duration = Math.random() * 4000 + 3000;

    particle.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 0
            },
            {
                transform: "translateY(-80px)",
                opacity: 1
            },
            {
                transform: "translateY(-160px)",
                opacity: 0
            }
        ],
        {
            duration: duration,
            iterations: 1
        }
    );

    setTimeout(() => {
        particle.remove();
    }, duration);
}

setInterval(createParticle, 300);
