"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.registerUser = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("./config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var registerUser = function registerUser(req, res) {
  var _req$body, email, password, role, _ref, _ref2, rows, hashedPassword;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_db["default"].query('SELECT * FROM users WHERE email = ?', [email]));

        case 4:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length > 0)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'El usuario ya existe'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 10));

        case 11:
          hashedPassword = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(_db["default"].query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]));

        case 14:
          res.status(201).json({
            message: 'Usuario registrado exitosamente'
          });
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Error al registrar el usuario'
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports.registerUser = registerUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, _ref3, _ref4, rows, user, validPassword, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_db["default"].query('SELECT * FROM users WHERE email = ?', [email]));

        case 4:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows = _ref4[0];

          if (!(rows.length === 0)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Usuario no encontrado'
          }));

        case 9:
          user = rows[0];
          _context2.next = 12;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 12:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Contraseña incorrecta'
          }));

        case 15:
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            role: user.role
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.status(200).json({
            token: token
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Error al iniciar sesión'
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 19]]);
};

exports.loginUser = loginUser;