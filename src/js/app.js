import * as PIXI from 'pixi.js';
import { contain } from 'intrinsic-scale';
import sayHello from './lib/sayHello';
import Asteroid from './asteroid';
import Ship from './ship';
import Shot from './shot';

class Controls {
  constructor(container) {
    this.canvasContainer = container;
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.asteroids = [];
    this.shots = [];
    this.asteroidsLimit = 15;

    this.canvas = new PIXI.Application({
      width: this.width,
      height: this.height,
      autoResize: true,
      autoStart: true,
      antialias: true,
      // backgroundAlpha: 0,
    });

    this.container = new PIXI.Container();
    this.init()
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener('keydown', this.manageShip.bind(this));

    this.canvasContainer.appendChild(this.canvas.view);
    this.canvas.stage.addChild(this.container);

    const rect = new PIXI.Graphics();
    rect.drawRect(0, 0, 1000, 700);
    this.container.addChild(rect);

    this.containerWidth = this.container.width;
    this.containerHeight = this.container.height;

    for (let i = 0; i < this.asteroidsLimit; i++) {
      const asteroid = new Asteroid(
        this.randomInteger(0, this.width),
        this.randomInteger(0, this.height),
        this.randomVector(),
        this.randomVector(),
        this.randomInteger(0, 1),
      );
      
      this.canvas.stage.addChild(asteroid.shape);
      this.asteroids.push(asteroid);
    }

    this.ship = new Ship(this.width / 2, this.height / 2);
    this.canvas.stage.addChild(this.ship.shape);
    this.render();
    this.resize();
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

  manageShip(event) {
    if (event.code === 'ArrowUp' && !this.ship.isMoving) {
      this.ship.move(10, 2);
    }
    if (event.code === 'ArrowLeft' && !this.ship.isRotating) {
      this.ship.rotate(10, -1)
    }
    if (event.code === 'ArrowRight' && !this.ship.isRotating) {
      this.ship.rotate(10, 1)
    }
    if (event.code === 'Space' && !this.ship.isRotating) {
      const shot = new Shot(this.ship.shape.x, this.ship.shape.y + this.ship.addY, this.ship.vx, this.ship.vy);
      this.canvas.stage.addChild(shot.shape);
      this.shots.push(shot);

      this.splitAsteroid(1);
    }
  }

  splitAsteroid(index) {
    const asteroidOne = new Asteroid(
      this.asteroids[index].x, 
      this.asteroids[index].y,
      this.randomVector(),
      this.randomVector(),
      true,
    );
    const asteroidTwo = new Asteroid(
      this.asteroids[index].x, 
      this.asteroids[index].y,
      this.randomVector(),
      this.randomVector(),
      true,
    );
    this.canvas.stage.removeChild(this.asteroids[index].shape);
    this.canvas.stage.addChild(asteroidOne.shape);
    this.canvas.stage.addChild(asteroidTwo.shape);
    this.asteroids.splice(index, 1, asteroidOne, asteroidTwo);
    this.resize();
  }

  render() {
    window.requestAnimationFrame(this.render.bind(this));

    this.asteroids.forEach( asteroid => {
      asteroid.think(this.width, this.height);
      asteroid.move();
    });

    this.shots.forEach( shot => {
      shot.move();
    })
  }

  resizeContainer() {
    const { width, height, x, y } = contain(this.width, this.height, this.containerWidth, this.containerHeight);
    this.container.width = width;
    this.container.height = height;
    this.container.position.set(x, y);

    const proportionalContainerWidth = this.container.width / this.containerWidth;
    const coefficient = Math.max(proportionalContainerWidth, 0.1);
    
    this.asteroids.forEach( asteroid => {
      asteroid.scale(coefficient);
    })

    this.shots.forEach( shot => {
      shot.scale(coefficient);
    })

    this.ship.scale(coefficient)
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