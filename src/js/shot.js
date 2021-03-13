import * as PIXI from 'pixi.js';

export default class Shot {
  constructor(x, y, angle) {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);

    this.x = x || 0;
    this.y = y || 0;

    this.angle = angle;

    this.radius = 2;
    this.init()
  }

  init() {
    this.draw();
    this.countDirection();
  }

  countDirection() {
    this.vy = ( -Math.tan(this.angle) - Math.sqrt( Math.tan(this.angle) ** 2 + 2) ) * 2;
    this.vx = this.vy * Math.tan(this.angle);

    console.log(this.vx, this.vy)
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
    this.shape.drawCircle(0, 0, 2);
    this.shape.endFill();
    this.shape.x = this.x;
    this.shape.y = this.y;
  }
}