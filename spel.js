const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const shipImage = document.getElementById("shipImage");

const shipWidth = 100;

const ship = {
  x: 0,
  y: 0,
  width: shipWidth,
  height: 0,
  speed: 7
};

const keys = {
  left: false,
  right: false
};

shipImage.onload = () => {
  const aspectRatio = shipImage.naturalHeight / shipImage.naturalWidth;
  ship.height = ship.width * aspectRatio;

  ship.x = width / 2 - ship.width / 2;
  ship.y = height - ship.height - 20;

  gameLoop();
};

window.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

function update() {
  if (keys.left) ship.x -= ship.speed;
  if (keys.right) ship.x += ship.speed;

  ship.x = Math.max(0, Math.min(width - ship.width, ship.x));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ship.y = height - ship.height - 20;
});
