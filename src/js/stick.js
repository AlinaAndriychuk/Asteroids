import * as PIXI from 'pixi.js';

export default class Stick {
  constructor(x, y, centerX, centerY, angle) {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);

    this.x = x || 0;
    this.y = y || 0;
    this.angle = angle;

    this.width = 30;
    this.height = 2;

    this.centerX = centerX || 0;
    this.centerY = centerY || 0;

    this.friction = 0.07;
    this.power = 15;
    this.init()
  }

  init() {
    this.draw();
    this.countDirection();
  }

  countDirection() {
    const dx = this.x - this.centerX;
    const dy = this.y - this.centerY;
      
      // interaction
    const angle = Math.atan2(dy, dx);
    const tx = this.x + Math.cos(angle);
    const ty = this.y + Math.sin(angle);
    
    this.vx = (tx - this.x) * this.power * this.friction;
    this.vy = (ty - this.y) * this.power * this.friction;
  }

  move() {
    this.shape.x += this.vx;
    this.shape.y += this.vy;
  }

  draw() {
    this.shape.drawRect(0, 0, this.width, this.height);
    this.shape.endFill();
    this.shape.x = this.x;
    this.shape.y = this.y;
    this.shape.angle = this.angle;
  }
}