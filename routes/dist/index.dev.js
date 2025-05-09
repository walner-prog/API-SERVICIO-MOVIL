"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./auth.js"));

var _uploadRoutes = _interopRequireDefault(require("./uploadRoutes.js"));

var _user = _interopRequireDefault(require("./user.js"));

var _vehiculos = _interopRequireDefault(require("./vehiculos.js"));

var _servicios = _interopRequireDefault(require("./servicios.js"));

var _negociaciones = _interopRequireDefault(require("./negociaciones.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/auth', _auth["default"]);
router.use('/', _uploadRoutes["default"]);
router.use('/', _user["default"]);
router.use('/', _vehiculos["default"]);
router.use('/', _servicios["default"]);
router.use('/', _negociaciones["default"]);
var _default = router;
exports["default"] = _default;