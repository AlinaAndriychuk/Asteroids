import * as PIXI from 'pixi.js';

export default class Shot {
  constructor(x, y, vx, vy) {
    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);

    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx;
    this.vy = vy;

    this.radius = 2;
    this.init()
  }

  init() {
    this.draw();
  }

  scale(coefficient) {
    this.shape.scale.set(coefficient);
  }

  move() {
    this.shape.x += this.vx;
    this.shape.y += this.vy;
  }

  draw() {
    this.shape.drawCircle(this.x, this.y, 2);
    this.shape.endFill();
  }
}