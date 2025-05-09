"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Rutas para registro e inicio de sesión


router.post('/register', _authController.register);
router.post('/login', _authController.login);
router.post('/verify-email/{token}', _authController.verifyEmail);
router.post('/recuperar-cuenta', _authController.forgotCredentials);
router.post('/reset-account', _authController.resetAccount);
router.post('/logout', _authMiddleware.authenticateJWT, _authController.logout); // Rutas protegidas que requieren autenticación

router.get('/protected-route', _authMiddleware.authenticateJWT, function (req, res) {
  res.status(200).json({
    message: 'Acceso a ruta protegida'
  });
});
var _default = router;
exports["default"] = _default;