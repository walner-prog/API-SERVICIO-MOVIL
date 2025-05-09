"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Rutas para registro e inicio de sesión


router.post('/register', _auth.registerUser);
router.post('/login', _auth.loginUser);
var _default = router;
exports["default"] = _default;