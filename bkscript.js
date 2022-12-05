const canvas = document.getElementById("bkCanvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// getting mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/80) * (canvas.width/80)
};

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
);

// create particle
class particle {
  constructor(x, y, directionX, directiony, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directiony;
    this.size = size;
    this.color = color;
  }
  // method to draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 9, false);
    ctx.fillStyle = 'linear-gradient(to bottom, #33ccff 0%, #669999 100%);'
    ctx.fill();
  }
  // check particle position, check mouse position, move the partical, draw the partical
  update() {
    if (this.x > canvas.width || this.x < 0 ) {
        this.directionX = -this.directionX;
    }
    if (this.y > canvas.width || this.y < 0 ) {
      this.directionY = -this.directionY;
    }
    //checking collision detection - mouse & partical positions
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if ( distance < mouse.radius + this.size){
        if (mouse.x < this.x && this.x < canvas.width - this.size * 2) {
            this.x += 2;
        }
        if (mouse.x > this.x && this.x > this.size * 2) {
            this.x -= 2;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 2) {
            this.x += 2;
        }
        if (mouse.y > this.y && this.y > this.size * 2) {
            this.y -= 2;
        }
    }
    // movement of particle
    this.x += this.directionX;
    this.y += this.directionY;
    // draw particle
    this.draw();
  }
}
//create particles
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 10000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 2) + .75;
    let x = (Math.random() * ((innerWidth - size * 1) - (size * 1)) + size * 1);
    let y = (Math.random() * ((innerHeight - size * 1) - (size * 1)) + size * 1);
    let directionX = (Math.random() * 3 / 2) - 1 +- 2;
    let directionY = (Math.random() * 3 / 2) - 1 -+ 2;
    let color = '#8C5523';
    particlesArray.push(new particle(x, y, directionX, directionY, size, color));
  }
}
// animation loop 
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);
    
  for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
  }
connect();
}
//resize event
window.addEventListener('resize',
    function(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      mouse.radius = ((canvas.height/70) * (canvas.height/70));
      init();
    }
);
//mouse out of the background
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.x = undefined;
    }
)
init();
animate();