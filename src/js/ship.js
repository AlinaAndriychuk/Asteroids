import * as PIXI from 'pixi.js';

export default class Ship {
  constructor(x, y) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);

    this.fire = new PIXI.Graphics();
    this.fire.lineStyle(1.5, 0xffffff);

    this.hideFire = true;

    this.shapePoint = new PIXI.Graphics();

    this.x = x || 0;
    this.y = y || 0;

    this.power = 5;

    this.height = 52;
    this.width = 28;

    this.draw();
  }

  rotate(friction, vr) {
    if(friction < 0) {
      window.cancelAnimationFrame(this.rotateRAF);
      this.isRotating = false;
      return;
    }

    if(this.shape.angle >= 360 || this.shape.angle <= -360) {
      this.shape.angle = 0
    }

    this.isRotating = true;
    this.shape.angle += vr;

    this.rotateRAF = window.requestAnimationFrame(this.rotate.bind(this, friction - 1, vr))
  }

  countDirection() {
    const dx = this.shapePoint.getGlobalPosition().x - this.shape.x;
    const dy = this.shapePoint.getGlobalPosition().y - this.shape.y;
      
      // interaction
    const angle = Math.atan2(dy, dx);
    const tx = this.shape.x + Math.cos(angle);
    const ty = this.shape.y + Math.sin(angle);
  
    this.vx = (tx - this.shape.x) * this.power;
    this.vy = (ty - this.shape.y) * this.power;
  }

  move(friction, v, width, height) {
    if(friction < 0) {
      window.cancelAnimationFrame(this.moveRAF)
      this.isMoving = false;
      this.switchFire(true)
      return;
    }

    this.isMoving = true;
    this.switchFire();
    this.think(width, height);
    this.countDirection();
    this.shape.x += this.vx;
    this.shape.y += this.vy;
  
    this.moveRAF = window.requestAnimationFrame(this.move.bind(this, friction - 1, v, width, height))
  }

  switchFire(hide) {
    const value = hide || !this.hideFire;

    if(value) {
      this.shape.removeChild(this.fire)
    } else {
      this.shape.addChild(this.fire)
    }
  }

  think(width, height) {
    const {x} = this.shape;
    const {y} = this.shape;

    if (x > width) {
      this.shape.x = -this.width;
    } else if (x + this.width < 0) {
      this.shape.x = width;
    }
    
    if (y > height) {
      this.shape.y = -this.width;
    } else if (y + this.width < 0) {
      this.shape.y = height;
    }
  }

  scale(coefficient) {
    this.shape.scale.set(coefficient);
  }

  draw() {
    this.shape.drawPolygon([
      0, 46,
      14, 0,
      28, 46,
      25, 37,
      3, 37
    ]);
    this.shape.endFill();
    this.shape.pivot.set(this.width / 2, this.height / 2);
    this.shape.y = this.y;
    this.shape.x = this.x;

    this.fire.drawPolygon([
      20, 37,
      14, 52,
      8, 37
    ]);
    this.fire.endFill();

    this.shapePoint.drawCircle(0, 0, 0);
    this.shapePoint.endFill();
    this.shapePoint.x = this.width / 2;
    this.shape.addChild(this.shapePoint)
  }
}