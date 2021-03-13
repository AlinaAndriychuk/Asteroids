import * as PIXI from 'pixi.js';

export default class Ship {
  constructor(x, y) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);

    this.shapePoint = new PIXI.Graphics();
    this.shapePoint.lineStyle(2, 0xffff00);

    this.x = x || 0;
    this.y = y || 0;

    this.height = 46;
    this.width = 28;
    this.radius = 2;

    this.draw();
  }

  resume(x, y) {
    this.shape.x = x;
    this.shape.y = y;
    this.shape.angle = 0;
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

  move(friction, v, width, height) {
    if(friction < 0) {
      window.cancelAnimationFrame(this.moveRAF)
      this.isMoving = false;
      return;
    }

    this.isMoving = true;
    this.think(width, height);
    if (this.shape.angle > 90 && this.shape.angle < 270 || this.shape.angle < -90 && this.shape.angle > -270){
      this.shape.y += v;
    } else {
      this.shape.y -= v;
    }

    if (this.shape.angle !== 0 && this.shape.angle !== 180 && this.shape.angle !== -180) {
      if (this.shape.angle > 0 && this.shape.angle < 180 || this.shape.angle < -180){
        this.shape.x += v;
      } else {
        this.shape.x -= v;
      }
    }
  
    this.moveRAF = window.requestAnimationFrame(this.move.bind(this, friction - 1, v, width, height))
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

    this.shapePoint.drawCircle(0, 0, this.radius);
    this.shapePoint.endFill();
    this.shapePoint.x = this.width / 2;
    this.shape.addChild(this.shapePoint)
  }
}