"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.store = exports.show = exports.empresaConEventos = exports.index = exports.iAll = void 0;

var _empresaModel = require("../models/empresaModel.js");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// empresaController.js
var empresaSchema = _joi["default"].object({
  nombre_comercial: _joi["default"].string().required(),
  ruc: _joi["default"].string().optional().allow(null, ''),
  telefono: _joi["default"].string().optional().allow(null, ''),
  direccion: _joi["default"].string().optional().allow(null, ''),
  logo_url: _joi["default"].string().uri().optional().allow(null, '')
});

var iAll = function iAll(req, res) {
  var empresas;
  return regeneratorRuntime.async(function iAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _empresaModel.getAll)());

        case 3:
          empresas = _context.sent;
          res.json(empresas);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error al obtener las empresas',
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.iAll = iAll;

var index = function index(req, res) {
  var userId, empresas;
  return regeneratorRuntime.async(function index$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id; // Asegúrate de que este id esté presente
          //  console.log("User ID:", userId); // Verifica que el ID del usuario esté correctamente recibido

          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _empresaModel.getEmpresaByUserId)(userId));

        case 4:
          empresas = _context2.sent;

          if (!(empresas.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'No hay empresas para este usuario'
          }));

        case 7:
          res.json(empresas); // Envía el array de empresas

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          // console.error('Error al obtener empresas:', err);
          res.status(500).json({
            message: 'Error al obtener la empresa',
            error: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.index = index;

var empresaConEventos = function empresaConEventos(req, res) {
  var userId, empresas;
  return regeneratorRuntime.async(function empresaConEventos$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap((0, _empresaModel.getEmpresasConEventosByUserId)(userId));

        case 4:
          empresas = _context3.sent;

          if (!(empresas.length === 0)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'No hay empresas para este usuario'
          }));

        case 7:
          res.json(empresas);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Error al obtener empresas y eventos',
            error: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.empresaConEventos = empresaConEventos;

var show = function show(req, res) {
  var id, results;
  return regeneratorRuntime.async(function show$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          console.log("Evento ID:", id);
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _empresaModel.getById)(id, req.user.id));

        case 5:
          results = _context4.sent;
          console.log('Resultados:', results);

          if (!(results.length === 0)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado'
          }));

        case 9:
          res.json(results[0]);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](2);
          res.status(500).json({
            message: 'Error al obtener el evento',
            error: _context4.t0.message
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 12]]);
};

exports.show = show;

var store = function store(req, res) {
  var _empresaSchema$valida, error, _req$body, nombre_comercial, ruc, telefono, direccion, logo_url, user_id, existing, result;

  return regeneratorRuntime.async(function store$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _empresaSchema$valida = empresaSchema.validate(req.body), error = _empresaSchema$valida.error;

          if (!error) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'El campo ' + error.details[0].context.key + ' es obligatorio'
          }));

        case 3:
          _req$body = req.body, nombre_comercial = _req$body.nombre_comercial, ruc = _req$body.ruc, telefono = _req$body.telefono, direccion = _req$body.direccion, logo_url = _req$body.logo_url;
          user_id = req.user.id;
          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap((0, _empresaModel.checkEmpresaExistsByName)(user_id, nombre_comercial));

        case 8:
          existing = _context5.sent;

          if (!(existing.length > 0)) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "Ya tienes una empresa registrada con el nombre comercial: ".concat(nombre_comercial)
          }));

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap((0, _empresaModel.create)({
            user_id: user_id,
            nombre_comercial: nombre_comercial,
            ruc: ruc,
            telefono: telefono,
            direccion: direccion,
            logo_url: logo_url
          }));

        case 13:
          result = _context5.sent;
          res.status(201).json({
            message: 'Empresa creada con éxito',
            empresa: {
              id: result.insertId,
              nombre_comercial: nombre_comercial,
              ruc: ruc,
              telefono: telefono,
              direccion: direccion,
              logo_url: logo_url
            }
          });
          _context5.next = 20;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](5);
          res.status(500).json({
            message: 'Hubo un problema al crear la empresa. Intenta nuevamente.',
            error: _context5.t0.message
          });

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 17]]);
};

exports.store = store;

var update = function update(req, res) {
  var empresaId, _req$body2, nombre_comercial, ruc, telefono, direccion, logo_url, cleanBody, _empresaSchema$valida2, error, existing, result;

  return regeneratorRuntime.async(function update$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          empresaId = req.params.id; // Limpiar campos no permitidos

          _req$body2 = req.body, nombre_comercial = _req$body2.nombre_comercial, ruc = _req$body2.ruc, telefono = _req$body2.telefono, direccion = _req$body2.direccion, logo_url = _req$body2.logo_url;
          cleanBody = {
            nombre_comercial: nombre_comercial,
            ruc: ruc,
            telefono: telefono,
            direccion: direccion,
            logo_url: logo_url
          };
          _empresaSchema$valida2 = empresaSchema.validate(cleanBody), error = _empresaSchema$valida2.error;

          if (!error) {
            _context6.next = 7;
            break;
          }

          console.error('Error de validación:', error.details[0].message);
          return _context6.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 7:
          _context6.prev = 7;
          _context6.next = 10;
          return regeneratorRuntime.awrap((0, _empresaModel.checkEmpresaExistsByNameUpdate)(null, nombre_comercial, empresaId));

        case 10:
          existing = _context6.sent;

          if (!(existing.length > 0)) {
            _context6.next = 13;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: "Ya existe una empresa registrada con el nombre comercial: ".concat(nombre_comercial)
          }));

        case 13:
          _context6.next = 15;
          return regeneratorRuntime.awrap((0, _empresaModel.updateEmpresa)(empresaId, cleanBody));

        case 15:
          result = _context6.sent;

          if (!(result.affectedRows === 0)) {
            _context6.next = 18;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Empresa no encontrada o no tienes permiso para editarla'
          }));

        case 18:
          res.json({
            message: 'Empresa actualizada correctamente'
          });
          _context6.next = 25;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](7);
          console.error('Error al actualizar empresa:', _context6.t0);
          res.status(500).json({
            message: 'Error al actualizar la empresa',
            error: _context6.t0.message
          });

        case 25:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[7, 21]]);
};

exports.update = update;

var destroy = function destroy(req, res) {
  var id, user_id, result;
  return regeneratorRuntime.async(function destroy$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          user_id = req.user.id;
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap((0, _empresaModel.softDelete)(id, user_id));

        case 5:
          result = _context7.sent;

          if (!(result.affectedRows === 0)) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: 'Empresa no encontrada o no tienes permiso para eliminarla'
          }));

        case 8:
          res.json({
            message: 'Empresa eliminada correctamente'
          });
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](2);
          res.status(500).json({
            message: 'Error al eliminar la empresa',
            error: _context7.t0.message
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.destroy = destroy;