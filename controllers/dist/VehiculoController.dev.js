"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.show = exports.store = exports.userMe = exports.index = void 0;

var _Vehiculo = _interopRequireDefault(require("../models/Vehiculo.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _joi = _interopRequireDefault(require("joi"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var registerVehiculoSchema = _joi["default"].object({
  marca: _joi["default"].string().required().messages({
    'string.empty': 'La marca es obligatoria'
  }),
  modelo: _joi["default"].string().required().messages({
    'string.empty': 'El modelo de vehiculo es obligatorio'
  }),
  capacidad: _joi["default"].number().integer().min(1).required().messages({
    'number.base': 'La capacidad debe ser un número entero',
    'number.min': 'La capacidad debe ser al menos 1',
    'number.empty': 'La capacidad es obligatoria'
  }),
  placa: _joi["default"].string().required().messages({
    'string.empty': 'La placa es obligatoria',
    Unique: 'Ya existe un vehículo con esa placa'
  }),
  tipo: _joi["default"].string().valid('moto', 'carro', 'camion', 'bus').required().messages({
    'any.only': 'El tipo de vehiculo debe ser moto , carro , camion  o bus',
    'string.empty': 'El tipo de vehiculo es obligatorio'
  })
});

var updateVehiculoSchema = _joi["default"].object({
  marca: _joi["default"].string().optional().messages({
    'string.empty': 'La marca no puede estar vacía'
  }),
  modelo: _joi["default"].string().optional().messages({
    'string.empty': 'El modelo no puede estar vacío'
  }),
  capacidad: _joi["default"].number().integer().min(1).optional().messages({
    'number.base': 'La capacidad debe ser un número entero',
    'number.min': 'La capacidad debe ser al menos 1'
  }),
  placa: _joi["default"].string().optional().messages({
    'string.empty': 'La placa no puede estar vacía',
    Unique: 'Ya existe un vehículo con esa placa'
  }),
  tipo: _joi["default"].string().valid('moto', 'carro', 'camion', 'bus').optional().messages({
    'any.only': 'El tipo debe ser moto, carro, camion o bus',
    'string.empty': 'El tipo de vehículo no puede estar vacío'
  })
}); // Obtener todos los vehículos del sistema (admin)


var index = function index(req, res) {
  var vehiculos;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findAll({
            include: {
              model: _User["default"],
              attributes: ["id", "name", "username", "email", "telefono", "tipo_usuario", "foto_perfil"] // solo los campos necesarios

            }
          }));

        case 3:
          vehiculos = _context.sent;
          res.json(vehiculos);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: "Error al obtener los vehículos",
            detail: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Obtener los vehículos del usuario autenticado


exports.index = index;

var userMe = function userMe(req, res) {
  var vehiculos;
  return regeneratorRuntime.async(function userMe$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findAll({
            where: {
              userId: req.user.id
            }
          }));

        case 3:
          vehiculos = _context2.sent;
          res.json(vehiculos);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: "Error al obtener tus vehículos",
            detail: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Crear un nuevo vehículo


exports.userMe = userMe;

var store = function store(req, res) {
  var _registerVehiculoSche, error, _req$body, tipo, marca, modelo, placa, capacidad, existente, vehiculo;

  return regeneratorRuntime.async(function store$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _registerVehiculoSche = registerVehiculoSchema.validate(req.body), error = _registerVehiculoSche.error;

          if (!error) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(422).json({
            error: error.details[0].message
          }));

        case 4:
          _req$body = req.body, tipo = _req$body.tipo, marca = _req$body.marca, modelo = _req$body.modelo, placa = _req$body.placa, capacidad = _req$body.capacidad;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findOne({
            where: {
              placa: placa
            }
          }));

        case 7:
          existente = _context3.sent;

          if (!existente) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            error: "Ya existe un vehículo con esa placa"
          }));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(_Vehiculo["default"].create({
            tipo: tipo,
            marca: marca,
            modelo: modelo,
            placa: placa,
            capacidad: capacidad,
            userId: req.user.id
          }));

        case 12:
          vehiculo = _context3.sent;
          res.status(201).json({
            message: "Vehículo registrado",
            vehiculo: vehiculo
          });
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: "Error al crear vehículo",
            detail: _context3.t0.message
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Obtener un solo vehículo por ID


exports.store = store;

var show = function show(req, res) {
  var vehiculo;
  return regeneratorRuntime.async(function show$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findByPk(req.params.id, {
            include: {
              model: _User["default"],
              attributes: ["id", "name", "username", "email", "telefono", "tipo_usuario", "foto_perfil"] // solo los campos necesarios

            }
          }));

        case 3:
          vehiculo = _context4.sent;

          if (vehiculo) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: "Vehículo no encontrado"
          }));

        case 6:
          res.json(vehiculo);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: "Error al obtener vehículo",
            detail: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Actualizar un vehículo


exports.show = show;

var update = function update(req, res) {
  var vehiculo, _updateVehiculoSchema, error, _req$body2, tipo, marca, modelo, placa, capacidad, existente;

  return regeneratorRuntime.async(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findByPk(req.params.id));

        case 3:
          vehiculo = _context5.sent;
          _updateVehiculoSchema = updateVehiculoSchema.validate(req.body), error = _updateVehiculoSchema.error;

          if (!error) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(422).json({
            error: error.details[0].message
          }));

        case 7:
          _req$body2 = req.body, tipo = _req$body2.tipo, marca = _req$body2.marca, modelo = _req$body2.modelo, placa = _req$body2.placa, capacidad = _req$body2.capacidad;
          _context5.next = 10;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findOne({
            where: {
              placa: placa,
              id: _defineProperty({}, _sequelize.Op.ne, req.params.id) // Ignorar el vehículo actual

            }
          }));

        case 10:
          existente = _context5.sent;

          if (!existente) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            error: "Ya existe un vehículo con esa placa"
          }));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(vehiculo.update({
            tipo: tipo || vehiculo.tipo,
            marca: marca || vehiculo.marca,
            modelo: modelo || vehiculo.modelo,
            placa: placa || vehiculo.placa,
            capacidad: capacidad || vehiculo.capacidad
          }));

        case 15:
          res.json({
            message: "Vehículo actualizado",
            vehiculo: vehiculo
          });
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: "Error al actualizar vehículo",
            detail: _context5.t0.message
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // Eliminar un vehículo


exports.update = update;

var destroy = function destroy(req, res) {
  var vehiculo;
  return regeneratorRuntime.async(function destroy$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_Vehiculo["default"].findByPk(req.params.id));

        case 3:
          vehiculo = _context6.sent;

          if (vehiculo) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: "Vehículo no encontrado"
          }));

        case 6:
          if (!(vehiculo.userId !== req.user.id)) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", res.status(403).json({
            error: "No autorizado"
          }));

        case 8:
          _context6.next = 10;
          return regeneratorRuntime.awrap(vehiculo.destroy());

        case 10:
          res.json({
            message: "Vehículo eliminado"
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: "Error al eliminar vehículo",
            detail: _context6.t0.message
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.destroy = destroy;