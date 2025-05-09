"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _promise = _interopRequireDefault(require("mysql2/promise"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _auth = _interopRequireDefault(require("../middleware/auth.js"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Librería para validación
_dotenv["default"].config();

var router = _express["default"].Router(); // Crear una conexión pool para un mejor manejo de conexiones


var db = _promise["default"].createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000
}); // Middleware para proteger todas las rutas


router.use(_auth["default"]); // Esquema de validación para los datos del libro

var libroSchema = _joi["default"].object({
  titulo: _joi["default"].string().required(),
  autor: _joi["default"].string().required(),
  descripcion: _joi["default"].string().optional(),
  categoria: _joi["default"].string().required(),
  año_publicacion: _joi["default"].number().integer().min(1900).max(new Date().getFullYear()).required()
}); // Ruta para agregar un nuevo libro


router.post('/', function _callee(req, res) {
  var _libroSchema$validate, error, _req$body, titulo, autor, descripcion, categoria, año_publicacion, _ref, _ref2, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _libroSchema$validate = libroSchema.validate(req.body), error = _libroSchema$validate.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 3:
          _req$body = req.body, titulo = _req$body.titulo, autor = _req$body.autor, descripcion = _req$body.descripcion, categoria = _req$body.categoria, año_publicacion = _req$body.año_publicacion;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(db.query('INSERT INTO libros (titulo, autor, descripcion, categoria, año_publicacion) VALUES (?, ?, ?, ?, ?)', [titulo, autor, descripcion, categoria, año_publicacion]));

        case 7:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          result = _ref2[0];
          res.status(201).json(_objectSpread({
            id: result.insertId
          }, req.body));
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](4);
          res.status(500).json({
            message: 'Error al agregar el libro',
            error: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 13]]);
}); // Ruta para actualizar un libro

router.put('/:id', function _callee2(req, res) {
  var id, _libroSchema$validate2, error, _req$body2, titulo, autor, descripcion, categoria, año_publicacion, _ref3, _ref4, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _libroSchema$validate2 = libroSchema.validate(req.body), error = _libroSchema$validate2.error;

          if (!error) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 4:
          _req$body2 = req.body, titulo = _req$body2.titulo, autor = _req$body2.autor, descripcion = _req$body2.descripcion, categoria = _req$body2.categoria, año_publicacion = _req$body2.año_publicacion;
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(db.query('UPDATE libros SET titulo = ?, autor = ?, descripcion = ?, categoria = ?, año_publicacion = ? WHERE id = ?', [titulo, autor, descripcion, categoria, año_publicacion, id]));

        case 8:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          result = _ref4[0];

          if (!(result.affectedRows === 0)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Libro no encontrado'
          }));

        case 13:
          res.json({
            message: 'Libro actualizado'
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](5);
          res.status(500).json({
            message: 'Error al actualizar el libro',
            error: _context2.t0.message
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 16]]);
}); // Ruta para eliminar un libro

router["delete"]('/:id', function _callee3(req, res) {
  var id, _ref5, _ref6, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(db.query('DELETE FROM libros WHERE id = ?', [id]));

        case 4:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          result = _ref6[0];

          if (!(result.affectedRows === 0)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Libro no encontrado'
          }));

        case 9:
          res.json({
            message: 'Libro eliminado'
          });
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            message: 'Error al eliminar el libro',
            error: _context3.t0.message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
var _default = router;
exports["default"] = _default;