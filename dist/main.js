let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let innerHeight = canvas.height;
let innerWidth = canvas.width;

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  innerWidth = canvas.width;
  innerHeight = canvas.height;
  SETUP();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("dblclick", () => document.body.requestFullscreen());

class Utility {
  static randomIntFromRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  static randomColors(colors) {
    return colors[Math.round(Math.random() * colors.length)];
  }
  static randomRGBA() {
    return `rgba( ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
      Math.random() * 255
    )}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 1)})`;
  }
}

class Particle {
  constructor(x, r, vx, vy, color) {
    this.pos = {
      x: x,
      y: r,
    };
    this.orgR = r;
    this.vy = vy;
    this.vx = vx;
    this.r = r;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.pos.y += this.vy;
    this.pos.x += this.vx;
    if (this.pos.y + this.r + this.vy >= canvas.height) {
      this.vy = 0;
      this.vx = 0;
    }
    if (this.pos.x + this.r + this.vx >= canvas.width) this.vx = -this.vx;
    if (this.pos.x - this.r <= 0) this.vx = -this.vx;
    if (
      mouse.x - this.pos.x < 50 &&
      mouse.x - this.pos.x > -50 &&
      mouse.y - this.pos.y < 50 &&
      mouse.y - this.pos.y > -50
    ) {
      if (this.r < 20) this.r++;
    } else {
      this.r = this.orgR;
    }
    this.draw();
  }
}

let circleNum = 500;
let circles;

function SETUP() {
  circles = [];
  for (let i = 0; i < circleNum; i++) {
    let randR = Utility.randomIntFromRange(2, 3);
    let randX = Utility.randomIntFromRange(0 + randR, canvas.width - randR);
    let randVy = Utility.randomIntFromRange(0, 2);
    let randVx = Utility.randomIntFromRange(-0.5, 0.5);
    let randC = "#fff";
    circles.push(new Particle(randX, randR, randVx, randVy, randC));
  }
}

function LOOP() {
  requestAnimationFrame(LOOP);

  c.fillStyle = "rgba(0,0,0,.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.update();
  });
}

if (document.visibilityState == "hidden") {
  clearInterval(particleGenerator);
}

let particleGenerator = setInterval(() => {
  for (let i = 0; i < 50; i++) {
    let randR = Utility.randomIntFromRange(2, 3);

    let randX = Utility.randomIntFromRange(0 + randR, canvas.width - randR);
    let randVy = Utility.randomIntFromRange(0, 2);
    let randVx = Utility.randomIntFromRange(-0.5, 0.5);

    let randC = "#fff";

    circles.push(new Particle(randX, randR, randVx, randVy, randC));
  }
}, 2000);

SETUP();
LOOP();
