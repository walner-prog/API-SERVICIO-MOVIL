"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// middlewares/upload.js
var storage = _multer["default"].memoryStorage();

var upload = (0, _multer["default"])({
  storage: storage
});
var _default = upload;
exports["default"] = _default;