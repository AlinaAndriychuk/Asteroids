import * as PIXI from 'pixi.js';

export default class Shot {
  constructor(x, y, centerX, centerY) {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);

    this.x = x || 0;
    this.y = y || 0;

    this.centerX = centerX || 0;
    this.centerY = centerY || 0;

    this.power = 15;
    this.radius = 2;
    this.init()
  }

  init() {
    this.draw();
    this.countDirection();
  }

  countDirection() {
    const dx = this.x - this.centerX;
    const dy = this.y - this.centerY;
      // const dist = Math.sqrt(dx*dx + dy*dy);
      
      // interaction
    const angle = Math.atan2(dy, dx);
    const tx = this.x + Math.cos(angle);
    const ty = this.y + Math.sin(angle);
  
    this.vx = (tx - this.x) * this.power;
    this.vy = (ty - this.y) * this.power;

    console.log(this.vx, this.vy)
  
      // spring back
      // const dx1 = -(this.x - this.originalX);
      // const dy1 = -(this.y - this.originalY);
  
      // this.vx += dx1 * this.springFactor;
      // this.vy += dy1 * this.springFactor;
  
      // friction
      // this.vx *= this.friction;
      // this.vy *= this.friction;
  }

  scale(coefficient) {
    this.shape.scale.set(coefficient);
  }

  visible(width, height) {
    const {x} = this.shape;
    const {y} = this.shape
    if (x > width || x + this.radius < 0 || y > height || y + this.radius < 0) {
      return true;
    }
    return false;
  }

  move() {
    this.shape.x += this.vx;
    this.shape.y += this.vy;
  }

  draw() {
    this.shape.drawCircle(0, 0, this.radius);
    this.shape.endFill();
    this.shape.x = this.x;
    this.shape.y = this.y;


  }
}