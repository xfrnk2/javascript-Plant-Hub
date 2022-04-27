
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const drops = [];
let selectedBox;

context.font = 'bold 30px sans-serif';

class Drop {
  constructor(index, x, y, speed, length) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.length = length;
    this.draw();
  }

  draw() {
    context.beginPath();
    context.strokeStyle = '#dfdfdf';
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.stroke();
    context.closePath();

  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drops.forEach((drop) => {
    drop.y += drop.speed;
    if (drop.y > canvas.height) {
      drop.y = 0;
      drop.x = Math.random() * canvas.width;
      drop.speed = Math.random() * 3 + 1;
      drop.length = Math.random() * 5 + 2;
    }

    drop.draw();
  });

  requestAnimationFrame(render);

let tempX, tempY, tempSpeed, tempLength;
for (let i = 0; i < 200; i++) {
  tempX = Math.random() * canvas.width;
  tempY = Math.random() * canvas.height;
  tempSpeed = Math.random() * 3 + 1;
  tempLength = Math.random() * 5 + 2;

  drops.push(new Drop(i, tempX, tempY, tempSpeed, tempLength));
}
render();