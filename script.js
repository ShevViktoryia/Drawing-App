const canvas = document.querySelector("canvas");
const decrease = document.querySelector(".decrease");
const increase = document.querySelector(".increase");
const brushSize = document.querySelector(".size");
const color = document.querySelector(".color");
const clear = document.querySelector(".clear");
const containerX = document.querySelector("canvas").offsetLeft;
const containerY = document.querySelector("canvas").offsetTop;

const ctx = canvas.getContext("2d");
let size = 5;
let isClicked = false;
let cur_color = (color.value = "#000000");
let x, y;

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = cur_color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = cur_color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSize() {
  brushSize.textContent = size;
}

canvas.onmousedown = (e) => {
  isClicked = true;
  x = e.clientX - containerX;
  y = e.clientY - containerY;
};

document.onmouseup = (e) => {
  isClicked = false;
  x = null;
  y = null;
};

canvas.onmousemove = (e) => {
  if (isClicked) {
    const x2 = e.clientX - containerX;
    const y2 = e.clientY - containerY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
};

increase.onclick = () => {
  size > 100 ? (size = 100) : (size += 5);
  updateSize();
};

decrease.onclick = () => {
  size < 5 ? (size = 5) : (size -= 5);
  updateSize();
};

color.onchange = (e) => (cur_color = e.target.value);
clear.onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
