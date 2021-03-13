"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var PIXI = _interopRequireWildcard(require("pixi.js"));

var _intrinsicScale = require("intrinsic-scale");

var _sayHello = _interopRequireDefault(require("./lib/sayHello"));

var _asteroid = _interopRequireDefault(require("./asteroid"));

var _ship = _interopRequireDefault(require("./ship"));

var _shot = _interopRequireDefault(require("./shot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controls =
/*#__PURE__*/
function () {
  function Controls(container, score, restart) {
    _classCallCheck(this, Controls);

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
      antialias: true
    });
    this.container = new PIXI.Container();
    this.init();
  }

  _createClass(Controls, [{
    key: "init",
    value: function init() {
      window.addEventListener("resize", this.resize.bind(this));
      window.addEventListener('keydown', this.manageShip.bind(this));
      this.restart.addEventListener('click', this.generateGraphics.bind(this));
      this.canvasContainer.appendChild(this.canvas.view);
      var rect = new PIXI.Graphics();
      rect.drawRect(0, 0, 1000, 700);
      this.container.addChild(rect);
      this.containerWidth = this.container.width;
      this.containerHeight = this.container.height;
      this.generateGraphics();
      this.render();
    }
  }, {
    key: "generateGraphics",
    value: function generateGraphics() {
      this.reset();
      this.canvas.stage.addChild(this.container);

      for (var i = 0; i < this.asteroidsLimit; i++) {
        var asteroid = new _asteroid["default"](this.randomInteger(0, this.width), this.randomInteger(0, this.height), this.randomVector(), this.randomVector(), this.randomInteger(0, 1));
        this.canvas.stage.addChild(asteroid.shape);
        this.asteroids.push(asteroid);
      }

      this.ship = new _ship["default"](this.width / 2, this.height / 2);
      this.canvas.stage.addChild(this.ship.shape);
      this.resize();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.canvas.stage.removeChildren();
      this.asteroids = [];
      this.shots = [];
      this.points = [];
    }
  }, {
    key: "randomInteger",
    value: function randomInteger(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      this.rand = Math.round(rand);
      return Math.round(rand);
    }
  }, {
    key: "randomVector",
    value: function randomVector() {
      var min = 0;
      var max = 1;
      var power = 2;
      var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
      this.rand = rand;

      if (rand === 1) {
        return Math.random() * power;
      }

      return -Math.random() * power;
    }
  }, {
    key: "manageShip",
    value: function manageShip(event) {
      if (event.code === 'ArrowUp' && !this.ship.isMoving) {
        this.ship.move(10, 2, this.width, this.height);
      }

      if (event.code === 'ArrowLeft' && !this.ship.isRotating) {
        this.ship.rotate(10, -4);
      }

      if (event.code === 'ArrowRight' && !this.ship.isRotating) {
        this.ship.rotate(10, 4);
      }

      if (event.code === 'Space' && !this.ship.isRotating) {
        var shot = new _shot["default"](this.ship.shapePoint.getGlobalPosition().x, this.ship.shapePoint.getGlobalPosition().y, this.ship.shape.x, this.ship.shape.y);
        this.canvas.stage.addChild(shot.shape);
        this.shots.push(shot);
      }
    }
  }, {
    key: "defineAsteroid",
    value: function defineAsteroid(asteroid, index) {
      if (asteroid.small) {
        this.removeAsteroid(asteroid, index);
      } else {
        this.splitAsteroid(asteroid, index);
      }
    }
  }, {
    key: "removeAsteroid",
    value: function removeAsteroid(asteroid, index) {
      this.canvas.stage.removeChild(asteroid.shape);
      this.asteroids.splice(index, 1);
      this.addScore(100);

      if (this.asteroids.length < this.asteroidsLimit) {
        this.addBigAsteroid();
      }
    }
  }, {
    key: "splitAsteroid",
    value: function splitAsteroid(asteroid, index) {
      var asteroidOne = new _asteroid["default"](asteroid.x, asteroid.y, this.randomVector(), this.randomVector(), true);
      var asteroidTwo = new _asteroid["default"](asteroid.x, asteroid.y, this.randomVector(), this.randomVector(), true);
      this.canvas.stage.removeChild(asteroid.shape);
      this.canvas.stage.addChild(asteroidOne.shape);
      this.canvas.stage.addChild(asteroidTwo.shape);
      this.asteroids.splice(index, 1, asteroidOne, asteroidTwo);
      this.addScore(20);
      this.resize();
    }
  }, {
    key: "addBigAsteroid",
    value: function addBigAsteroid() {
      var asteroid = new _asteroid["default"](this.randomInteger(0, this.width), this.height, this.randomVector(), this.randomVector(), false);
      this.canvas.stage.addChild(asteroid.shape);
      this.asteroids.push(asteroid);
      this.resize();
    }
  }, {
    key: "boom",
    value: function boom(x, y) {
      var _this = this;

      var number = 5;
      var friction = 0.1;

      var _loop = function _loop(i) {
        var point = new _shot["default"](x, y, _this.randomVector() + x, _this.randomVector() + y, friction);

        _this.canvas.stage.addChild(point.shape);

        _this.points.push(point);

        var index = _this.points.length - 1;
        setTimeout(function () {
          return _this.removePoint(point, index);
        }, 600);
      };

      for (var i = 0; i < number; i++) {
        _loop(i);
      }
    }
  }, {
    key: "addScore",
    value: function addScore(number) {
      var current = +this.score.innerText;
      this.score.innerText = current + number;
    }
  }, {
    key: "removeShot",
    value: function removeShot(shot, index) {
      this.canvas.stage.removeChild(shot.shape);
      this.shots.splice(index, 1);
    }
  }, {
    key: "removePoint",
    value: function removePoint(point, index) {
      this.canvas.stage.removeChild(point.shape);
      this.points.splice(index, 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      window.requestAnimationFrame(this.render.bind(this));
      this.asteroids.forEach(function (asteroid, index) {
        asteroid.think(_this2.width, _this2.height);
        asteroid.move();

        if (_this2.hitTestRectangle(asteroid.shape, _this2.ship.shape)) {
          _this2.defineAsteroid(asteroid, index);

          _this2.ship.resume(_this2.width / 2, _this2.height / 2);

          _this2.boom(asteroid.x, asteroid.y);
        }
      });
      this.shots.forEach(function (shot, index) {
        shot.move();

        if (shot.visible(_this2.width, _this2.height)) {
          _this2.removeShot(shot, index);
        }

        _this2.asteroids.forEach(function (asteroid, indexOfAsteroid) {
          if (_this2.hitTestRectangle(asteroid.shape, shot.shape)) {
            _this2.defineAsteroid(asteroid, indexOfAsteroid);

            _this2.boom(asteroid.x, asteroid.y);

            _this2.removeShot(shot, index);
          }
        });
      });
      this.points.forEach(function (point) {
        point.move();
      });
    }
  }, {
    key: "hitTestRectangle",
    value: function hitTestRectangle(rect1, rect2) {
      var r1 = rect1;
      var r2 = rect2;
      this.hit = false;
      r1.centerX = r1.x + r1.width / 2;
      r1.centerY = r1.y + r1.height / 2;
      r2.centerX = r2.x + r2.width / 2;
      r2.centerY = r2.y + r2.height / 2;
      r1.halfWidth = r1.width / 2;
      r1.halfHeight = r1.height / 2;
      r2.halfWidth = r2.width / 2;
      r2.halfHeight = r2.height / 2;
      var vx = r1.centerX - r2.centerX;
      var vy = r1.centerY - r2.centerY;
      var combinedHalfWidths = r1.halfWidth + r2.halfWidth;
      var combinedHalfHeights = r1.halfHeight + r2.halfHeight;

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
    }
  }, {
    key: "resizeContainer",
    value: function resizeContainer() {
      var _contain = (0, _intrinsicScale.contain)(this.width, this.height, this.containerWidth, this.containerHeight),
          width = _contain.width,
          height = _contain.height,
          x = _contain.x,
          y = _contain.y;

      this.container.width = width;
      this.container.height = height;
      this.container.position.set(x, y);
      var proportionalContainerWidth = this.container.width / this.containerWidth;
      var coefficient = Math.max(proportionalContainerWidth, 0.1);
      this.asteroids.forEach(function (asteroid) {
        asteroid.scale(coefficient);
      });
      this.shots.forEach(function (shot) {
        shot.scale(coefficient);
      });
      this.ship.scale(coefficient);
    }
  }, {
    key: "resize",
    value: function resize() {
      this.width = this.canvasContainer.clientWidth;
      this.height = this.canvasContainer.clientHeight;
      this.canvas.renderer.resize(this.width, this.height);
      this.resizeContainer();
    }
  }]);

  return Controls;
}();

var container = document.querySelector('.js-container');
var score = document.querySelector('.js-score');
var restart = document.querySelector('.js-restart');
var controls = new Controls(container, score, restart);
(0, _sayHello["default"])();