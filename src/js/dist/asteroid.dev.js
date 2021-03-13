"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var PIXI = _interopRequireWildcard(require("pixi.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Asteroid =
/*#__PURE__*/
function () {
  function Asteroid(x, y, vx, vy, size) {
    _classCallCheck(this, Asteroid);

    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);
    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.size = size;
    this.width = 100;
    this.draw();
  }

  _createClass(Asteroid, [{
    key: "think",
    value: function think(width, height) {
      var x = this.x;
      var y = this.y;

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
  }, {
    key: "scale",
    value: function scale(coefficient) {
      this.shape.scale.set(coefficient / this.size);
    }
  }, {
    key: "move",
    value: function move() {
      this.shape.x = this.x;
      this.shape.y = this.y;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.shape.drawPolygon([0, 25, 37, 25, 27, 3, 60, 0, 100, 25, 100, 35, 52, 48, 100, 68, 77, 97, 56, 82, 20, 100, 0, 60]);
      this.shape.endFill();
      this.move();
    }
  }]);

  return Asteroid;
}();

exports["default"] = Asteroid;