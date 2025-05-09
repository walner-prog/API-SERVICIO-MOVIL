"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _upload = _interopRequireDefault(require("../middleware/upload.js"));

var _uploadController = require("../controllers/uploadController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// routes/uploadRoutes.js
var router = _express["default"].Router();

router.post('/upload', _upload["default"].single('file'), _uploadController.uploadImage);
var _default = router;
exports["default"] = _default;