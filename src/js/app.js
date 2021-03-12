import * as PIXI from 'pixi.js';
import { contain } from 'intrinsic-scale';
import sayHello from './lib/sayHello';
import Asteroid from './asteroid';
import Ship from './ship';

class Controls {
  constructor(container) {
    this.canvasContainer = container;
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.asteroids = [];
    this.asteroidsLimit = 5;

    this.canvas = new PIXI.Application({
      width: this.width,
      height: this.height,
      autoResize: true,
      autoStart: true,
      antialias: true,
      backgroundAlpha: 0,
    });

    this.container = new PIXI.Container();
    this.init()
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener('keydown', this.moveShip.bind(this));

    this.canvasContainer.appendChild(this.canvas.view);
    this.canvas.stage.addChild(this.container);

    const rect = new PIXI.Graphics();
    rect.lineStyle(2, 0x000000)
    rect.drawRect(0, 0, 1500, 1000);
    this.container.addChild(rect);

    this.containerWidth = this.container.width;
    this.containerHeight = this.container.height;
    this.resize();

    for (let i = 0; i < this.asteroidsLimit; i++) {
      const asteroid = new Asteroid(
        this.randomInteger(0, this.width),
        this.randomInteger(0, this.height),
        this.randomVector(),
        this.randomVector(),
      );
      
      this.canvas.stage.addChild(asteroid.shape);
      this.asteroids.push(asteroid);
    }

    this.ship = new Ship(this.containerWidth / 2, this.containerHeight / 2);
    this.container.addChild(this.ship.shape);
    this.render();
  }

  resizeContainer() {
    const { width, height, x, y } = contain(this.width, this.height, this.containerWidth, this.containerHeight);
    this.container.width = width;
    this.container.height = height;
    this.container.position.set(x, y);
  }

  randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    this.rand = Math.round(rand);
    return Math.round(rand);
  }

  randomVector() {
    const min = 0;
    const max = 1;
    const rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    this.rand = rand;
    
    if(rand === 1) {
      return 1;
    }
    return -1;
  }

  render() {
    window.requestAnimationFrame(this.render.bind(this));

    this.asteroids.forEach( asteroid => {
      asteroid.think(this.width, this.height);
      asteroid.move();
    })
  }

  moveShip(event) {
    if (event.code === 'ArrowUp' && !this.ship.isMoving) {
      this.ship.move(10, 2)
    }
    if (event.code === 'ArrowLeft' && !this.ship.isRotating) {
      this.ship.rotate(10, -1)
    }
    if (event.code === 'ArrowRight' && !this.ship.isRotating) {
      this.ship.rotate(10, 1)
    }
  }

  resize() {
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.canvas.renderer.resize(this.width, this.height);
    this.resizeContainer();
  }
}

const container = document.querySelector('.js-container');
const controls = new Controls(container);

sayHello();