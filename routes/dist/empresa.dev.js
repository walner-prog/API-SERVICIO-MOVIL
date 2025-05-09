"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("../middleware/authMiddleware.js");

var _empresaController = require("../controllers/empresaController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.use(_authMiddleware.authenticateJWT);
router.post("/empresas", _authMiddleware.authenticateJWT, _empresaController.store);
router.get("/todas-las-empresas", _authMiddleware.authenticateJWT, _empresaController.iAll);
router.get("/todas-las-empresas-eventos", _authMiddleware.authenticateJWT, _empresaController.empresaConEventos);
router.get("/empresas", _authMiddleware.authenticateJWT, _empresaController.index);
router.post("/empresas", _authMiddleware.authenticateJWT, _empresaController.store);
router.get("/empresa/:id", _authMiddleware.authenticateJWT, _empresaController.show);
router.put("/empresas/:id", _authMiddleware.authenticateJWT, _empresaController.update);
router["delete"]("/empresas/:id", _authMiddleware.authenticateJWT, _empresaController.destroy);
router.get('/exists', function _callee(req, res) {
  var nombre_comercial, _ref, _ref2, rows, exists;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nombre_comercial = req.query.nombre_comercial;

          if (nombre_comercial) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'El nombre comercial es obligatorio.'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.query('SELECT id FROM empresas WHERE nombre_comercial = ? AND deleted_at IS NULL', [nombre_comercial]));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          exists = rows.length > 0;
          return _context.abrupt("return", res.json({
            exists: exists
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.error('Error al verificar el nombre comercial:', _context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: 'Hubo un problema al verificar el nombre comercial.'
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
});
var _default = router;
exports["default"] = _default;