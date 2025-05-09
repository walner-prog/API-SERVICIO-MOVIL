"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _eventoController = require("../controllers/eventoController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//   archivo de routes/evento.js
var router = _express["default"].Router();

router.use(_authMiddleware.authenticateJWT);
router.get("/todos-los-eventos", _authMiddleware.authenticateJWT, _eventoController.iAll);
router.get("/todos-los-eventos-destacados", _authMiddleware.authenticateJWT, _eventoController.EventosDestacados);
router.get("/todos-los-eventos-proximos", _authMiddleware.authenticateJWT, _eventoController.EventosProximos);
router.get("/todos-los-eventos-precios", _authMiddleware.authenticateJWT, _eventoController.EventosPrecioCero);
router.get("/eventos", _authMiddleware.authenticateJWT, _eventoController.index);
router.post("/eventos", _authMiddleware.authenticateJWT, _eventoController.store);
router.post("/eventos", _authMiddleware.authenticateJWT, _eventoController.store);
router.get("/eventos/:id", _authMiddleware.authenticateJWT, _eventoController.show);
router.put("/eventos/:id", _authMiddleware.authenticateJWT, _eventoController.update);
router["delete"]("/eventos/:id", _authMiddleware.authenticateJWT, _eventoController.destroy);
var _default = router;
exports["default"] = _default;