// 🌌 Žvaigždžių fonas (tik pirmajam puslapiui)
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Pritaikom dydį prie lango
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Žvaigždės klasė
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
    this.speed = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

// Sukuriam žvaigždes
let stars = [];
for (let i = 0; i < 200; i++) stars.push(new Star());

// Animacija
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// 🌟 Puslapių perjungimas
function nextPage(n) {
  const pages = document.querySelectorAll('.page');
  const video = document.getElementById('bgVideoPage2');
  const canvas = document.getElementById('stars');

  // Paslepiam visus puslapius
  pages.forEach(p => p.classList.add('hidden'));

  // Parodom tinkamą
  const current = document.getElementById('page' + n);
  current.classList.remove('hidden');

  // Rodom/slepiam video ir canvas
  if (n === 2) {
    video.style.display = 'block';
    canvas.style.display = 'none';
  } else {
    video.style.display = 'none';
    canvas.style.display = 'block';
  }

  // Išsaugom puslapį
  localStorage.setItem('currentPage', n);

  // Scrollinam į viršų
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// 🌙 Kai puslapis kraunasi
window.addEventListener('DOMContentLoaded', () => {
  const savedPage = parseInt(localStorage.getItem('currentPage')) || 1;
  nextPage(savedPage);
});

// ❌ Neleisti horizontalaus scroll
document.body.style.overflowX = 'hidden';
