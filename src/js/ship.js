import * as PIXI from 'pixi.js';

export default class Ship {
  constructor(x, y) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0x000000);

    this.x = x || 0;
    this.y = y || 0;

    this.color = '#ffffff';
    this.draw();
  }

  rotate(friction, vr) {
    if(friction < 0) {
      window.cancelAnimationFrame(this.rotateRAF);
      this.isRotating = false
      return;
    }

    if(this.shape.angle >= 360 || this.shape.angle <= -360) {
      this.shape.angle = 0
    }

    this.isRotating = true;
    this.shape.angle += vr;
    this.rotateRAF = window.requestAnimationFrame(this.rotate.bind(this, friction - 1, vr))
  }

  move(friction, v) {
    if(friction < 0) {
      window.cancelAnimationFrame(this.moveRAF)
      this.isMoving = false;
      return;
    }

    this.isMoving = true;
    if (this.shape.angle > 90 && this.shape.angle < 270 || this.shape.angle < -90 && this.shape.angle > -270){
      this.shape.y += v;
    } else {
      this.shape.y -= v;
    }

    if (this.shape.angle !== 0) {
      if (this.shape.angle > 0 && this.shape.angle < 180 || this.shape.angle < -180){
        this.shape.x += v;
      } else {
        this.shape.x -= v;
      }
    }
  
    this.moveRAF = window.requestAnimationFrame(this.move.bind(this, friction - 1, v))
  }

  draw() {
    this.shape.drawPolygon([
      0, 70,
      20, 0,
      40, 70,
      36, 57,
      4, 57
    ]);
    this.shape.endFill();
    this.shape.pivot.set(20, 35);
    this.shape.y = this.y;
    this.shape.x = this.x;
  }
}