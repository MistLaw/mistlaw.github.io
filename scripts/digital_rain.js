const rain_canvas = document.getElementById('particleCanvas');
const rain_ctx = rain_canvas.getContext('2d');
let width = rain_canvas.width = document.documentElement.clientWidth;
let height = rain_canvas.height = document.documentElement.clientHeight;

// Configuration
const particleCount = 1;
const speed = 20;
const particles = [];

// Particle class
class Particle {
  constructor(x, fromTop = false) {
    this.x = x;
    this.y = fromTop ? -20 : height + 20;
    this.fromTop = fromTop;
    this.vy = speed + Math.random() * 2;
    if (this.fromTop) this.vy *= -1; // move downward if from top
    this.vx = 0;
    this.trail = [];
    this.maxTrail = 12 + Math.floor(Math.random() * 8);
    this.state = "up";
    this.switched = false;
    this.horizontalSteps = 0;
    this.direction = 1;
    this.setRandomColor();
  }

  update() {
    // Occasionally switch to horizontal movement
    if (this.state === "up" && Math.random() < 0.02 && !this.switched) {
      this.state = "horizontal";
      this.horizontalSteps = 10 + Math.floor(Math.random() * 20);
      this.direction = Math.random() < 0.5 ? 1 : -1;
      this.vx = this.direction * (speed * 0.5 + Math.random() * 2);
      this.switched = true;
    }

    if (this.state === "horizontal") {
      this.x += this.vx;
      this.horizontalSteps--;
      if (this.horizontalSteps <= 0) {
        this.state = "up";
        this.vx = 0;
      }
    }

    this.y -= this.vy; // vertical movement, negative vy moves up, positive moves down

    // Add current position to trail
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrail) this.trail.shift();

    // Reset particle if off screen
    if (this.y < -20 || this.y > height + 20 || this.x < -50 || this.x > width + 50) {
      this.fromTop = Math.random() < 0.5 ? false : true;
      this.y = this.fromTop ? -20 : height + 20;
      this.trail = [];
      this.setRandomColor();
      this.x = Math.random() * width;
      this.vy = speed + Math.random() * 2;
      if (this.fromTop) this.vy *= -1;
      this.state = "up";
      this.switched = false;
      this.vx = 0;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  setRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.6; // keep alpha consistent for trail effect
    this.color = `rgba(${r},${g},${b},${a})`;
  }
}

// Function to spawn particles gradually from bottom or top
function spawnParticles() {
  if (particles.length < particleCount) {
    const xPos = Math.random() * width;
    const fromTop = Math.random() < 0.5; // 50% chance to spawn from top
    particles.push(new Particle(xPos, fromTop));
    setTimeout(spawnParticles, 100 + Math.random() * 300);
  }
}

// Start spawning
spawnParticles();