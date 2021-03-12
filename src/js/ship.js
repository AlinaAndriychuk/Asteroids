import * as PIXI from 'pixi.js';

export default class Ship {
  constructor(x, y) {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);

    this.x = x || 0;
    this.y = y || 0;

    this.vy = -1;
    this.vx = 0;
    this.addY = -35;
    this.hypotenuse = 35;

    this.height = 46;
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

    if (this.shape.angle < 45 && this.shape.angle > 0 || this.shape.angle > -45 && this.shape.angle < 0){
      this.smallLeg = this.hypotenuse * Math.cos(this.shape.angle);
      this.bigLeg = this.hypotenuse * Math.cos(90 - this.shape.angle);
    }

    this.vx = this.smallLeg / this.bigLeg;
    this.addY = this.bigLeg;

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

    if (this.shape.angle !== 0 && this.shape.angle !== 180 && this.shape.angle !== -180) {
      if (this.shape.angle > 0 && this.shape.angle < 180 || this.shape.angle < -180){
        this.shape.x += v;
      } else {
        this.shape.x -= v;
      }
    }
  
    this.moveRAF = window.requestAnimationFrame(this.move.bind(this, friction - 1, v))
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
  }
}