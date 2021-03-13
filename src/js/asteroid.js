import * as PIXI from 'pixi.js';

export default class Asteroid {
  constructor(x, y, vx, vy, small) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);

    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.small = small || false;

    this.width = 100;
    this.draw();
  }

  think(width, height) {
    const {x} = this;
    const {y} = this;

    if (x > width) {
      this.x = -this.width;
    } else if (x + this.width < 0) {
      this.x = width;
    }
    
    if (y > height) {
      this.y = -this.width;
    } else if (y + this.width < 0) {
      this.y = height;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  scale(coefficient) {
    if(this.small) {
      this.shape.scale.set(coefficient / 3);
    } else {
      this.shape.scale.set(coefficient);
    }
  }

  move() {
    this.shape.x = this.x;
    this.shape.y = this.y;
  }

  draw() {
    this.shape.drawPolygon([
      0, 25,
      37, 25,
      27, 3,
      60, 0,
      100, 25,
      100, 35,
      52, 48,
      100, 68,
      77, 97,
      56, 82,
      20, 100,
      0, 60
    ]);
    this.shape.endFill();
    this.move()
  }
}