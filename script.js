// ========== Efek Hujan Emoji ==========
function createEmoji() {
    const emojiList = [ "🙏" , "🎉" , "✨" , "🌙" ]; // Daftar emoji yang ingin digunakan
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");

    // Memilih emoji secara acak dari daftar
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

    // Menentukan posisi acak di layar
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = Math.random() * 2 + 3 + "s"; // Durasi antara 3-5 detik

    document.body.appendChild(emoji);

    // Hapus emoji setelah selesai animasi
    setTimeout(() => {
        emoji.remove();
    }, 5000);
}

// Membuat emoji setiap 300 milidetik
setInterval(createEmoji, 300);


// ========== Efek Kembang Api ==========
const canvas = document.createElement("canvas");
canvas.id = "fireworksCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// Menyesuaikan ukuran canvas agar penuh layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 2;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * -4 - 2;
        this.alpha = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const fireworks = [];

function createFirework() {
    const colors = ["#ff0000", "#ff7300", "#ffeb00", "#00ff00", "#0073ff", "#8000ff", "#ff00ff"];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2; // Biar kembang api muncul dari atas
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 30; i++) {
        fireworks.push(new Firework(x, y, color));
    }
}

function animateFireworks() {
    requestAnimationFrame(animateFireworks);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
}

setInterval(createFirework, 500); // Menambahkan kembang api setiap 0.5 detik
animateFireworks();


