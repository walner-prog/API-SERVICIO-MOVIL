"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

var _empresaController = require("../controllers/empresaController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_authMiddleware["default"]);
router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);
router.post('/', crearCategoria);
router.put('/:id', actualizarCategoria);
router["delete"]('/:id', eliminarCategoria);
router.get('/empresas', _empresaController.index);
router.post('/empresas', _empresaController.store);
router.get('/empresas/{empresa}', _empresaController.show);
router.put('/empresas/{empresa}', _empresaController.update);
router["delete"]('/empresas/{empresa}', _empresaController.destroy);
var _default = router;
exports["default"] = _default;