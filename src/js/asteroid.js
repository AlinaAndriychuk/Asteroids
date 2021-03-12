import * as PIXI from 'pixi.js';

export default class Asteroid {
  constructor(x, y, vx, vy) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0x000000);

    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;

    this.color = '#ffffff';
    this.width = 80;
    this.draw();
  }

  think(width, height) {
    const {x} = this.shape.getGlobalPosition();
    const {y} = this.shape.getGlobalPosition();

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

  move() {
    this.shape.x = this.x;
    this.shape.y = this.y;
  }

  draw() {
    this.shape.drawPolygon([
      0, 20,
      30, 20,
      20, 2,
      50, 0,
      80, 15,
      80, 25,
      48, 35,
      80, 48,
      56, 70,
      46, 60,
      20, 70,
      0, 50
    ]);
    this.shape.endFill();
    this.move()
  }
}