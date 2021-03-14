"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var PIXI = _interopRequireWildcard(require("pixi.js"));

var _intrinsicScale = require("intrinsic-scale");

var _sayHello = _interopRequireDefault(require("./lib/sayHello"));

var _asteroid = _interopRequireDefault(require("./asteroid"));

var _ship = _interopRequireDefault(require("./ship"));

var _shot = _interopRequireDefault(require("./shot"));

var _stick = _interopRequireDefault(require("./stick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controls =
/*#__PURE__*/
function () {
  function Controls(_ref) {
    var container = _ref.container,
        score = _ref.score,
        restart = _ref.restart;

    _classCallCheck(this, Controls);

    this.canvasContainer = container;
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.asteroids = [];
    this.shots = [];
    this.points = [];
    this.sticks = [];
    this.asteroidsLimit = 10;
    this.hitPoints = [];
    this.numberOfhitPoints = 3;
    this.scoreNumber = 0;
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
        var asteroid = new _asteroid["default"](this.randomInteger(0, this.width), this.randomInteger(0, this.height), this.randomVector(), this.randomVector(), this.randomInteger(1, 3));
        this.canvas.stage.addChild(asteroid.shape);
        this.asteroids.push(asteroid);
      }

      this.ship = new _ship["default"](this.width / 2, this.height / 2);
      this.canvas.stage.addChild(this.ship.shape);
      this.setHitPoints();
      this.resize();
    }
  }, {
    key: "setHitPoints",
    value: function setHitPoints() {
      var interval = 20;
      var left = 180;

      for (var i = 0; i < this.numberOfhitPoints; i++) {
        var hitPoint = new _ship["default"](left + i * (this.ship.width + interval), this.ship.height);
        this.canvas.stage.addChild(hitPoint.shape);
        this.hitPoints.push(hitPoint);
      }
    }
  }, {
    key: "subtractHitPoint",
    value: function subtractHitPoint() {
      var _this = this;

      this.canvas.stage.removeChild(this.hitPoints[this.hitPoints.length - 1].shape);
      this.hitPoints.pop();
      this.ship = null;
      this.createShip = true;

      if (this.hitPoints.length === 0) {
        this.score.classList.add('full');
        this.restart.classList.add('full');
        this.createShip = false;
      } else {
        setTimeout(function () {
          if (_this.createShip) {
            _this.ship = new _ship["default"](_this.width / 2, _this.height / 2);

            _this.canvas.stage.addChild(_this.ship.shape);
          }
        }, 1000);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.canvas.stage.removeChildren();
      this.asteroids = [];
      this.shots = [];
      this.points = [];
      this.stick = [];
      this.hitPoints = [];
      this.scoreNumber = 0;
      this.addScore(0);
      this.score.classList.remove('full');
      this.restart.classList.remove('full');
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
      if (!this.ship) return;

      if (event.code === 'ArrowUp' && !this.ship.isMoving) {
        this.ship.move(10, 2, this.width, this.height);
      }

      if (event.code === 'ArrowLeft' && !this.ship.isRotating) {
        this.ship.rotate(10, -4);
      }

      if (event.code === 'ArrowRight' && !this.ship.isRotating) {
        this.ship.rotate(10, 4);
      }

      if (event.code === 'ArrowDown' && !this.ship.isRotating) {
        console.log(this.shots);
      }

      if (event.code === 'Space' && !this.ship.isRotating) {
        var shot = new _shot["default"](this.ship.shapePoint.getGlobalPosition().x, this.ship.shapePoint.getGlobalPosition().y, this.ship.shape.x, this.ship.shape.y);
        this.canvas.stage.addChild(shot.shape);
        this.shots.push(shot);
      }
    }
  }, {
    key: "shipCollision",
    value: function shipCollision(asteroid, index) {
      this.defineAsteroid(asteroid, index);
      this.brokeShip(this.ship.shape.x, this.ship.shape.y);
      this.boom(asteroid.x, asteroid.y);
      this.canvas.stage.removeChild(this.ship.shape);
      this.subtractHitPoint();
    }
  }, {
    key: "defineAsteroid",
    value: function defineAsteroid(asteroid, index) {
      if (asteroid.size === 3) {
        this.removeGraphics(asteroid, this.asteroids);

        if (this.asteroids.length < this.asteroidsLimit) {
          this.addBigAsteroid();
        }

        this.addScore(100);
      } else if (asteroid.size === 2) {
        this.splitAsteroid(asteroid, index);
        this.addScore(50);
      } else {
        this.splitAsteroid(asteroid, index);
        this.addScore(20);
      }
    }
  }, {
    key: "splitAsteroid",
    value: function splitAsteroid(asteroid, index) {
      var asteroidOne = new _asteroid["default"](asteroid.x, asteroid.y, this.randomVector(), this.randomVector(), asteroid.size + 1);
      var asteroidTwo = new _asteroid["default"](asteroid.x, asteroid.y, this.randomVector(), this.randomVector(), asteroid.size + 1);
      this.canvas.stage.removeChild(asteroid.shape);
      this.canvas.stage.addChild(asteroidOne.shape);
      this.canvas.stage.addChild(asteroidTwo.shape);
      this.asteroids.splice(index, 1, asteroidOne, asteroidTwo);
      this.resize();
    }
  }, {
    key: "addBigAsteroid",
    value: function addBigAsteroid() {
      var asteroid = new _asteroid["default"](this.randomInteger(0, this.width), this.height, this.randomVector(), this.randomVector(), 1);
      this.canvas.stage.addChild(asteroid.shape);
      this.asteroids.push(asteroid);
      this.resize();
    }
  }, {
    key: "brokeShip",
    value: function brokeShip(x, y) {
      var _this2 = this;

      var number = 3;

      var _loop = function _loop(i) {
        var stick = new _stick["default"](x, y, _this2.randomVector() + x, _this2.randomVector() + y, _this2.randomInteger(0, 360));

        _this2.canvas.stage.addChild(stick.shape);

        _this2.sticks.push(stick);

        setTimeout(function () {
          return _this2.removeGraphics(stick, _this2.sticks);
        }, 600);
      };

      for (var i = 0; i < number; i++) {
        _loop(i);
      }
    }
  }, {
    key: "boom",
    value: function boom(x, y) {
      var _this3 = this;

      var number = 5;
      var friction = 0.1;

      var _loop2 = function _loop2(i) {
        var point = new _shot["default"](x, y, _this3.randomVector() + x, _this3.randomVector() + y, friction);

        _this3.canvas.stage.addChild(point.shape);

        _this3.points.push(point);

        setTimeout(function () {
          return _this3.removeGraphics(point, _this3.points);
        }, 600);
      };

      for (var i = 0; i < number; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "addScore",
    value: function addScore(number) {
      this.scoreNumber += number;
      this.score.innerText = this.scoreNumber;
    }
  }, {
    key: "removeGraphics",
    value: function removeGraphics(elem, arr) {
      this.canvas.stage.removeChild(elem.shape);
      arr.splice(arr.indexOf(elem), 1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      window.requestAnimationFrame(this.render.bind(this));
      this.asteroids.forEach(function (asteroid, index) {
        asteroid.think(_this4.width, _this4.height);
        asteroid.move();

        if (_this4.ship && _this4.hitTestRectangle(asteroid.shape, _this4.ship.shape)) {
          _this4.shipCollision(asteroid, index);
        }
      });
      this.shots.forEach(function (shot) {
        shot.move();

        if (shot.hidden(_this4.width, _this4.height)) {
          _this4.removeGraphics(shot, _this4.shots);
        }

        _this4.asteroids.forEach(function (asteroid, indexOfAsteroid) {
          if (_this4.canvas.stage.children.includes(shot.shape) && _this4.hitTestRectangle(asteroid.shape, shot.shape)) {
            _this4.defineAsteroid(asteroid, indexOfAsteroid);

            _this4.boom(asteroid.x, asteroid.y);

            _this4.canvas.stage.removeChild(shot.shape);
          }
        });
      });
      this.points.forEach(function (point) {
        point.move();
      });
      this.sticks.forEach(function (stick) {
        stick.move();
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

      if (this.ship) {
        this.ship.scale(coefficient);
      }
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
var controls = new Controls({
  container: container,
  score: score,
  restart: restart
});
(0, _sayHello["default"])();