"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _ServicioController = require("../controllers/ServicioController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//   archivo de routes/servicios.js
var router = _express["default"].Router(); //router.use(authenticateJWT);


router.get("/todos-los-servicios", _authMiddleware.authenticateJWT, _ServicioController.index);
router.get("/servicios-me", _authMiddleware.authenticateJWT, _ServicioController.userMe);
router.post("/servicios", _authMiddleware.authenticateJWT, _ServicioController.store);
router.get("/servicios/:id", _authMiddleware.authenticateJWT, _ServicioController.show);
router.put("/servicios/:id", _authMiddleware.authenticateJWT, _ServicioController.update);
router["delete"]("/servicios/:id", _authMiddleware.authenticateJWT, _ServicioController.destroy);
var _default = router;
exports["default"] = _default;