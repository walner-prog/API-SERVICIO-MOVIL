"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.store = exports.userMe = exports.index = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _sequelize = require("sequelize");

var _Servicio = _interopRequireDefault(require("../models/Servicio.js"));

var _Vehiculo = _interopRequireDefault(require("../models/Vehiculo.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 🎯 Validación con Joi
var servicioSchema = _joi["default"].object({
  vehiculo_id: _joi["default"].number().required(),
  origen: _joi["default"].string().required(),
  destino: _joi["default"].string().required(),
  fecha_hora: _joi["default"].date().iso().required(),
  precio_final: _joi["default"].number().optional(),
  estado: _joi["default"].string().valid('pendiente', 'negociando', 'aceptado', 'finalizado', 'cancelado').optional()
}); // 📄 GET /todos-los-servicios


var index = function index(req, res) {
  var servicios;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Servicio["default"].findAll({
            include: [{
              model: _User["default"],
              as: 'cliente',
              attributes: ['id', 'nombre', 'email']
            }, {
              model: _Vehiculo["default"],
              as: 'vehiculo'
            }],
            order: [['createdAt', 'DESC']]
          }));

        case 3:
          servicios = _context.sent;
          res.json(servicios);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Error al obtener los servicios'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // 👤 GET /servicios-me (servicios del usuario autenticado)


exports.index = index;

var userMe = function userMe(req, res) {
  var userId, servicios;
  return regeneratorRuntime.async(function userMe$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_Servicio["default"].findAll({
            where: {
              cliente_id: userId
            },
            include: [{
              model: _Vehiculo["default"],
              as: 'vehiculo'
            }],
            order: [['createdAt', 'DESC']]
          }));

        case 4:
          servicios = _context2.sent;
          res.json(servicios);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: 'Error al obtener los servicios del usuario'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // 🆕 POST /servicios


exports.userMe = userMe;

var store = function store(req, res) {
  var _servicioSchema$valid, error, value, servicio;

  return regeneratorRuntime.async(function store$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _servicioSchema$valid = servicioSchema.validate(req.body, {
            abortEarly: false
          }), error = _servicioSchema$valid.error, value = _servicioSchema$valid.value;

          if (!error) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            errors: error.details.map(function (err) {
              return err.message;
            })
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(_Servicio["default"].create(_objectSpread({}, value, {
            cliente_id: req.user.id
          })));

        case 6:
          servicio = _context3.sent;
          res.status(201).json(servicio);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Error al registrar el servicio'
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // 🔍 GET /servicios/:id


exports.store = store;

var show = function show(req, res) {
  var id, servicio;
  return regeneratorRuntime.async(function show$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_Servicio["default"].findByPk(id, {
            include: [{
              model: _User["default"],
              as: 'cliente',
              attributes: ['id', 'nombre', 'email']
            }, {
              model: _Vehiculo["default"],
              as: 'vehiculo'
            }]
          }));

        case 4:
          servicio = _context4.sent;

          if (servicio) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Servicio no encontrado'
          }));

        case 7:
          res.json(servicio);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: 'Error al obtener el servicio'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // ✏️ PUT /servicios/:id


exports.show = show;

var update = function update(req, res) {
  var id, servicio, _servicioSchema$valid2, error, value;

  return regeneratorRuntime.async(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Servicio["default"].findByPk(id));

        case 4:
          servicio = _context5.sent;

          if (servicio) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: 'Servicio no encontrado'
          }));

        case 7:
          _servicioSchema$valid2 = servicioSchema.validate(req.body, {
            abortEarly: false
          }), error = _servicioSchema$valid2.error, value = _servicioSchema$valid2.value;

          if (!error) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            errors: error.details.map(function (err) {
              return err.message;
            })
          }));

        case 10:
          _context5.next = 12;
          return regeneratorRuntime.awrap(servicio.update(value));

        case 12:
          res.json(servicio);
          _context5.next = 18;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: 'Error al actualizar el servicio'
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // 🗑️ DELETE /servicios/:id


exports.update = update;

var destroy = function destroy(req, res) {
  var id, servicio;
  return regeneratorRuntime.async(function destroy$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_Servicio["default"].findByPk(id));

        case 4:
          servicio = _context6.sent;

          if (servicio) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: 'Servicio no encontrado'
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(servicio.destroy());

        case 9:
          res.json({
            message: 'Servicio eliminado correctamente'
          });
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: 'Error al eliminar el servicio'
          });

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.destroy = destroy;