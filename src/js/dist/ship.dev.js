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

var Ship =
/*#__PURE__*/
function () {
  function Ship(x, y) {
    _classCallCheck(this, Ship);

    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(2, 0xffffff);
    this.x = x || 0;
    this.y = y || 0;
    this.height = 46;
    this.width = 28;
    this.draw();
  }

  _createClass(Ship, [{
    key: "resume",
    value: function resume(x, y) {
      this.shape.x = x;
      this.shape.y = y;
      this.shape.angle = 0;
    }
  }, {
    key: "rotate",
    value: function rotate(friction, vr) {
      if (friction < 0) {
        window.cancelAnimationFrame(this.rotateRAF);
        this.isRotating = false;
        return;
      }

      if (this.shape.angle >= 360 || this.shape.angle <= -360) {
        this.shape.angle = 0;
      }

      this.isRotating = true;
      this.shape.angle += vr;
      this.rotateRAF = window.requestAnimationFrame(this.rotate.bind(this, friction - 1, vr));
    }
  }, {
    key: "move",
    value: function move(friction, v, width, height) {
      if (friction < 0) {
        window.cancelAnimationFrame(this.moveRAF);
        this.isMoving = false;
        return;
      }

      this.isMoving = true;
      this.think(width, height);

      if (this.shape.angle > 90 && this.shape.angle < 270 || this.shape.angle < -90 && this.shape.angle > -270) {
        this.shape.y += v;
      } else {
        this.shape.y -= v;
      }

      if (this.shape.angle !== 0 && this.shape.angle !== 180 && this.shape.angle !== -180) {
        if (this.shape.angle > 0 && this.shape.angle < 180 || this.shape.angle < -180) {
          this.shape.x += v;
        } else {
          this.shape.x -= v;
        }
      }

      this.moveRAF = window.requestAnimationFrame(this.move.bind(this, friction - 1, v, width, height));
    }
  }, {
    key: "think",
    value: function think(width, height) {
      var x = this.shape.x;
      var y = this.shape.y;

      if (x > width) {
        this.shape.x = -this.width;
      } else if (x + this.width < 0) {
        this.shape.x = width;
      }

      if (y > height) {
        this.shape.y = -this.width;
      } else if (y + this.width < 0) {
        this.shape.y = height;
      }
    }
  }, {
    key: "scale",
    value: function scale(coefficient) {
      this.shape.scale.set(coefficient);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.shape.drawPolygon([0, 46, 14, 0, 28, 46, 25, 37, 3, 37]);
      this.shape.endFill();
      this.shape.pivot.set(this.width / 2, this.height / 2);
      this.shape.y = this.y;
      this.shape.x = this.x;
    }
  }]);

  return Ship;
}();

exports["default"] = Ship;