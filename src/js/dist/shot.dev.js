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
  function Shot(x, y, angle) {
    _classCallCheck(this, Shot);

    this.shape = new PIXI.Graphics();
    this.shape.beginFill(0xfffffff);
    this.x = x || 0;
    this.y = y || 0;
    this.angle = angle;
    this.radius = 2;
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
    value: function countDirection() {
      this.vy = (-Math.tan(this.angle) - Math.sqrt(Math.pow(Math.tan(this.angle), 2) + 2)) * 2;
      this.vx = this.vy * Math.tan(this.angle);
      console.log(this.vx, this.vy);
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
      this.shape.drawCircle(0, 0, 2);
      this.shape.endFill();
      this.shape.x = this.x;
      this.shape.y = this.y;
    }
  }]);

  return Shot;
}();

exports["default"] = Shot;