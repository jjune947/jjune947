const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

window.addEventListener('resize', setCanvasSize);

const stars = [];
const numStars = 800;
const speed = 1;

// Create stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        size: Math.random() * 2 + 1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
            star.z = canvas.width;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
        }

        const x = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
        const y = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
        const radius = star.size * (canvas.width / star.z);

        const r = Math.min(255, 255 * (1 - star.z / canvas.width) + 100);
        const g = Math.min(255, 255 * (1 - star.z / canvas.width) + 100);
        const b = 255;
        const a = 1 - star.z / canvas.width;


        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

draw();
