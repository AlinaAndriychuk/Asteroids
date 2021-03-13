import * as PIXI from 'pixi.js';
import { contain } from 'intrinsic-scale';
import sayHello from './lib/sayHello';
import Asteroid from './asteroid';
import Ship from './ship';
import Shot from './shot';

class Controls {
  constructor(container, score, restart) {
    this.canvasContainer = container;
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.asteroids = [];
    this.shots = [];
    this.points = [];
    this.asteroidsLimit = 15;

    this.score = score;
    this.restart = restart;

    this.canvas = new PIXI.Application({
      width: this.width,
      height: this.height,
      autoResize: true,
      autoStart: true,
      antialias: true,
    });

    this.container = new PIXI.Container();
    this.init()
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener('keydown', this.manageShip.bind(this));

    this.restart.addEventListener('click', this.generateGraphics.bind(this));

    this.canvasContainer.appendChild(this.canvas.view);

    const rect = new PIXI.Graphics();
    rect.drawRect(0, 0, 1000, 700);
    this.container.addChild(rect);

    this.containerWidth = this.container.width;
    this.containerHeight = this.container.height;

    this.generateGraphics();

    this.render();
  }

  generateGraphics() {
    this.reset();
    this.canvas.stage.addChild(this.container);

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

    this.resize();
  }

  reset() {
    this.canvas.stage.removeChildren();
    this.asteroids = [];
    this.shots = [];
    this.points = [];
  }

  randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    this.rand = Math.round(rand);
    return Math.round(rand);
  }

  randomVector() {
    const min = 0;
    const max = 1;
    const power = 2;
    const rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    this.rand = rand;
    
    if(rand === 1) {
      return Math.random() * power;
    }
    return -Math.random() * power;
  }

  manageShip(event) {
    if (event.code === 'ArrowUp' && !this.ship.isMoving) {
      this.ship.move(10, 2, this.width, this.height);
    }
    if (event.code === 'ArrowLeft' && !this.ship.isRotating) {
      this.ship.rotate(10, -4)
    }
    if (event.code === 'ArrowRight' && !this.ship.isRotating) {
      this.ship.rotate(10, 4)
    }
    if (event.code === 'Space' && !this.ship.isRotating) {
      const shot = new Shot(
        this.ship.shapePoint.getGlobalPosition().x, 
        this.ship.shapePoint.getGlobalPosition().y, 
        this.ship.shape.x,
        this.ship.shape.y
      );

      this.canvas.stage.addChild(shot.shape);
      this.shots.push(shot);
    }
  }

  defineAsteroid(asteroid, index) {
    if(asteroid.small) {
      this.removeAsteroid(asteroid, index)
    } else {
      this.splitAsteroid(asteroid, index)
    }
  }

  removeAsteroid(asteroid, index) {
    this.canvas.stage.removeChild(asteroid.shape);
    this.asteroids.splice(index, 1);

    this.addScore(100);

    if(this.asteroids.length < this.asteroidsLimit) {
      this.addBigAsteroid();
    }
  }

  splitAsteroid(asteroid, index) {
    const asteroidOne = new Asteroid(
      asteroid.x, 
      asteroid.y,
      this.randomVector(),
      this.randomVector(),
      true,
    );
    const asteroidTwo = new Asteroid(
      asteroid.x, 
      asteroid.y,
      this.randomVector(),
      this.randomVector(),
      true,
    );
    this.canvas.stage.removeChild(asteroid.shape);
    this.canvas.stage.addChild(asteroidOne.shape);
    this.canvas.stage.addChild(asteroidTwo.shape);
    this.asteroids.splice(index, 1, asteroidOne, asteroidTwo);

    this.addScore(20);
    this.resize();
  }

  addBigAsteroid() {
    const asteroid = new Asteroid(
      this.randomInteger(0, this.width),
      this.height,
      this.randomVector(),
      this.randomVector(),
      false,
    );

    this.canvas.stage.addChild(asteroid.shape);
    this.asteroids.push(asteroid)
    this.resize()
  }

  boom(x, y) {
    const number = 5;
    const friction = 0.1;

    for (let i = 0; i < number; i++) {
      const point = new Shot(
        x,
        y,
        this.randomVector() + x,
        this.randomVector() + y,
        friction,
      );

      this.canvas.stage.addChild(point.shape);
      this.points.push(point);

      const index = this.points.length - 1;
      setTimeout(()=> this.removePoint(point, index), 600)
    }
  }

  addScore(number) {
    const current = +this.score.innerText;
    this.score.innerText = current + number;
  }

  removeShot(shot, index) {
    this.canvas.stage.removeChild(shot.shape);
    this.shots.splice(index, 1);
  }

  removePoint(point, index) {
    this.canvas.stage.removeChild(point.shape);
    this.points.splice(index, 1);
  }

  render() {
    window.requestAnimationFrame(this.render.bind(this));

    this.asteroids.forEach( (asteroid, index) => {
      asteroid.think(this.width, this.height);
      asteroid.move();
      if (this.hitTestRectangle(asteroid.shape, this.ship.shape)) {
        this.defineAsteroid(asteroid, index);
        this.ship.resume(this.width / 2, this.height / 2);
        this.boom(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.width / 2)
      }
    });

    this.shots.forEach( (shot, index) => {
      shot.move();

      if(shot.visible(this.width, this.height)) {
        this.removeShot(shot, index)
      }

      this.asteroids.forEach( (asteroid, indexOfAsteroid) => {
        if (this.hitTestRectangle(asteroid.shape, shot.shape)) {
          this.defineAsteroid(asteroid, indexOfAsteroid);
          this.boom(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.width / 2)
          this.removeShot(shot, index)
        }
      });
    });

    this.points.forEach( point => {
      point.move();
    });
  }

  hitTestRectangle(rect1, rect2) {

    const r1 = rect1;
    const r2 = rect2;

    this.hit = false;
  
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    const vx = r1.centerX - r2.centerX;
    const vy = r1.centerY - r2.centerY;
  
    const combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    const combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    if (Math.abs(vx) < combinedHalfWidths) {
  
      if (Math.abs(vy) < combinedHalfHeights) {
        this.hit = true;
      } else {
        this.hit = false;
      }
    } else {
      this.hit = false;
    }

    return this.hit;
  };

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
const score = document.querySelector('.js-score');
const restart = document.querySelector('.js-restart');

const controls = new Controls(container, score, restart);

sayHello();