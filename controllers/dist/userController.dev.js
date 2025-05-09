"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactivarCuenta = exports.eliminarCuenta = exports.actualizarPerfil = exports.me = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _index = require("../models/index.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

var updateSchema = _joi["default"].object({
  name: _joi["default"].string().optional().messages({
    'string.empty': 'El nombre no puede estar vacío'
  }),
  username: _joi["default"].string().optional().messages({
    'string.empty': 'El nombre de usuario no puede estar vacío'
  }),
  email: _joi["default"].string().email().optional().messages({
    'string.email': 'Debes ingresar un correo electrónico válido'
  }),
  password: _joi["default"].string().min(6).optional().allow('', null).messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres'
  }),
  foto_perfil: _joi["default"].string().optional().allow(null, ''),
  cedula: _joi["default"].string().optional().allow(null, ''),
  telefono: _joi["default"].string().optional().allow(null, ''),
  latitud: _joi["default"].string().optional().allow(null, ''),
  longitud: _joi["default"].string().optional().allow(null, ''),
  tipo_usuario: _joi["default"].string().valid('Cliente', 'Conductor').optional().messages({
    'any.only': 'El tipo de usuario debe ser Cliente o Conductor'
  })
}); // GET /miperfil


var me = function me(req, res) {
  var user;
  return regeneratorRuntime.async(function me$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_index.User.findByPk(req.user.id, {
            attributes: {
              exclude: ['password']
            }
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: 'Usuario no encontrado'
          }));

        case 6:
          res.json(user);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Error al obtener el perfil',
            detail: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // PUT /me


exports.me = me;

var actualizarPerfil = function actualizarPerfil(req, res) {
  var user, _updateSchema$validat, error, _req$body, name, username, email, password, foto_perfil, cedula, telefono, latitud, longitud, tipo_usuario;

  return regeneratorRuntime.async(function actualizarPerfil$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_index.User.findByPk(req.user.id));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: 'Usuario no encontrado'
          }));

        case 6:
          // Validar datos
          _updateSchema$validat = updateSchema.validate(req.body), error = _updateSchema$validat.error;

          if (!error) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(422).json({
            error: error.details[0].message
          }));

        case 9:
          _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, foto_perfil = _req$body.foto_perfil, cedula = _req$body.cedula, telefono = _req$body.telefono, latitud = _req$body.latitud, longitud = _req$body.longitud, tipo_usuario = _req$body.tipo_usuario; // Si viene nueva contraseña, encriptarla

          if (!password) {
            _context2.next = 14;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 13:
          password = _context2.sent;

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(user.update({
            name: name || user.name,
            username: username || user.username,
            email: email || user.email,
            telefono: telefono || user.telefono,
            latitud: latitud || user.latitud,
            longitud: longitud || user.longitud,
            tipo_usuario: tipo_usuario,
            foto_perfil: foto_perfil || user.foto_perfil,
            cedula: cedula || user.cedula,
            password: password || user.password // si viene, actualiza

          }));

        case 16:
          res.json({
            message: 'Perfil actualizado correctamente',
            user: user
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: 'Error al actualizar perfil',
            detail: _context2.t0.message
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // DELETE /me


exports.actualizarPerfil = actualizarPerfil;

var eliminarCuenta = function eliminarCuenta(req, res) {
  var user;
  return regeneratorRuntime.async(function eliminarCuenta$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_index.User.findByPk(req.user.id));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            error: 'Usuario no encontrado'
          }));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(user.update({
            deleted_at: new Date()
          }));

        case 8:
          res.json({
            message: 'Cuenta desactivada correctamente'
          });
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Error al desactivar cuenta',
            detail: _context3.t0.message
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // POST /reactivar


exports.eliminarCuenta = eliminarCuenta;

var reactivarCuenta = function reactivarCuenta(req, res) {
  var _req$body2, username, password, user, passwordMatch, token;

  return regeneratorRuntime.async(function reactivarCuenta$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_index.User.findOne({
            where: {
              username: username
            },
            paranoid: false // para incluir usuarios soft-deleted

          }));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Usuario no encontrado'
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 9:
          passwordMatch = _context4.sent;

          if (passwordMatch) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(401).json({
            error: 'Contraseña incorrecta'
          }));

        case 12:
          if (user.deleted_at) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'La cuenta ya está activa'
          }));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(user.restore());

        case 16:
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            username: user.username
          }, JWT_SECRET, {
            expiresIn: '1d'
          });
          res.json({
            message: 'Cuenta reactivada exitosamente',
            token: token
          });
          _context4.next = 23;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json({
            error: 'Error al reactivar cuenta',
            detail: _context4.t0.message
          });

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

exports.reactivarCuenta = reactivarCuenta;