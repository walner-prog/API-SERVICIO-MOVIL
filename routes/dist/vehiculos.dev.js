"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _VehiculoController = require("../controllers/VehiculoController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//   archivo de routes/vehiculos.js
var router = _express["default"].Router(); //router.use(authenticateJWT);


router.get("/todos-los-vehiculos", _authMiddleware.authenticateJWT, _VehiculoController.index);
router.get("/vehiculos-me", _authMiddleware.authenticateJWT, _VehiculoController.userMe);
router.post("/vehiculos", _authMiddleware.authenticateJWT, _VehiculoController.store);
router.get("/vehiculos/:id", _authMiddleware.authenticateJWT, _VehiculoController.show);
router.put("/vehiculos/:id", _authMiddleware.authenticateJWT, _VehiculoController.update);
router["delete"]("/vehiculos/:id", _authMiddleware.authenticateJWT, _VehiculoController.destroy);
var _default = router;
exports["default"] = _default;