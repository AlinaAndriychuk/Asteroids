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

var Shot =
/*#__PURE__*/
function () {
  function Shot(x, y, centerX, centerY, friction) {
    _classCallCheck(this, Shot);

    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);
    this.x = x || 0;
    this.y = y || 0;
    this.centerX = centerX || 0;
    this.centerY = centerY || 0;
    this.friction = friction || 1;
    this.power = 15;
    this.radius = 2.5;
    this.init();
  }

  _createClass(Shot, [{
    key: "init",
    value: function init() {
      this.draw();
      this.countDirection();
    }
  }, {
    key: "countDirection",
    value: function countDirection(friction) {
      var dx = this.x - this.centerX;
      var dy = this.y - this.centerY; // interaction

      var angle = Math.atan2(dy, dx);
      var tx = this.x + Math.cos(angle);
      var ty = this.y + Math.sin(angle);
      this.vx = (tx - this.x) * this.power * this.friction;
      this.vy = (ty - this.y) * this.power * this.friction;
    }
  }, {
    key: "scale",
    value: function scale(coefficient) {
      this.shape.scale.set(coefficient);
    }
  }, {
    key: "visible",
    value: function visible(width, height) {
      var x = this.shape.x;
      var y = this.shape.y;

      if (x > width || x + this.radius < 0 || y > height || y + this.radius < 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "move",
    value: function move() {
      this.shape.x += this.vx;
      this.shape.y += this.vy;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.shape.drawCircle(0, 0, this.radius);
      this.shape.endFill();
      this.shape.x = this.x;
      this.shape.y = this.y;
    }
  }]);

  return Shot;
}();

exports["default"] = Shot;