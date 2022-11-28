const canvas = document.getElementById("bkCanvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// getting mouse position
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height/90) * (canvas.width/90)
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
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * .045, false);
    ctx.fillStyle = '#857c01'
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
        if (mouse.x < this.x && this.x < canvas.width - this.size * 8) {
            this.x += 8;
        }
        if (mouse.x > this.x && this.x > this.size * 8) {
            this.x -= 8;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 8) {
            this.x += 8;
        }
        if (mouse.y > this.y && this.y > this.size * 8) {
            this.y -= 8;
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
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 5) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5 / 2.5) - 1 +- 4;
    let directionY = (Math.random() * 3 / 2.5) - 2 -+ 4;
    let color = '#8C5523';
    //document.body.style.background = '#' + randomColor;
    //color.innerHTML = '#' + randomColor;
    particlesArray.push(new particle(x, y, directionX, directionY, size, color));
  }
}
// check if particles are close enough to draw a line between them
function connect(){
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++){
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) 
         * (particlesArray[a].x - particlesArray[b].x))
        + ((particlesArray[a].y - particlesArray[b].y) * 
        (particlesArray[a].y - particlesArray[b].y));
        if (distance < (canvas.width/6) * (canvas.height/8.4)) {
          opacityValue = 1 - (distance / 20000);
          ctx.strokeStyle= 'rgba(235,52,52,' + opacityValue + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
      }
    }
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