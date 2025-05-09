"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _multer = _interopRequireDefault(require("multer"));

var _userController = require("../controllers/userController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Ruta protegida para obtener datos del usuario autenticado


router.get("/miperfil", _authMiddleware.authenticateJWT, _userController.me); // Actualizar perfil (opcionalmente con imagen)

router.put("/me", _authMiddleware.authenticateJWT, _userController.actualizarPerfil); // Eliminar/desactivar cuenta (soft delete)

router["delete"]("/me", _authMiddleware.authenticateJWT, _userController.eliminarCuenta); // Reactivar cuenta con username + password

router.post("/reactivar", _userController.reactivarCuenta);
var _default = router;
exports["default"] = _default;