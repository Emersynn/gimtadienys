const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Canvas dydžio nustatymas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Star klasė
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

// Sukuriame žvaigždes
let stars = [];
for (let i = 0; i < 200; i++) stars.push(new Star());

// Animacijos funkcija
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();

function nextPage(n) {
  // Paslepiam visas korteles
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page${n}`).classList.remove('hidden');

  // Išsaugom, kuriame puslapyje esam
  localStorage.setItem('currentPage', n);

  // Fono valdymas
  const video = document.getElementById('bgVideoPage2');
  const canvas = document.getElementById('stars');

  if (n === 2) {
    video.style.display = 'block';
    canvas.style.display = 'none';
  } else {
    video.style.display = 'none';
    canvas.style.display = 'block';
  }
}

// Kai puslapis užkraunamas
window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideoPage2');
  const canvas = document.getElementById('stars');

  // Gauta išsaugota reikšmė arba 1, jei nieko nėra
  const savedPage = parseInt(localStorage.getItem('currentPage')) || 1;

  // Užkraunam atitinkamą puslapį
  nextPage(savedPage);

  // Pirmo puslapio atveju užtikrinam, kad video paslėptas
  if (savedPage !== 2) {
    video.style.display = 'none';
    canvas.style.display = 'block';
  }
});

