"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _NegociacionController = require("../controllers/NegociacionController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//   archivo de routes/negociaciones.js
var router = _express["default"].Router(); //router.use(authenticateJWT);


router.get("/todas-las-negociaciones", _authMiddleware.authenticateJWT, _NegociacionController.index);
router.get("/negociaciones-me", _authMiddleware.authenticateJWT, _NegociacionController.userMe);
router.post("/negociaciones", _authMiddleware.authenticateJWT, _NegociacionController.store);
router.get("/negociaciones/:id", _authMiddleware.authenticateJWT, _NegociacionController.show);
router.put("/negociaciones/:id", _authMiddleware.authenticateJWT, _NegociacionController.update);
router["delete"]("/negociaciones/:id", _authMiddleware.authenticateJWT, _NegociacionController.destroy);
var _default = router;
exports["default"] = _default;