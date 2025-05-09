"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;

var _eventoModel = require("../models/eventoModel.js");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var eventoSchema = _joi["default"].object({
  empresa_id: _joi["default"].number().required(),
  titulo: _joi["default"].string().required(),
  slug: _joi["default"].string().required(),
  descripcion: _joi["default"].string().allow(null, ''),
  fecha_inicio: _joi["default"].date().required(),
  fecha_fin: _joi["default"].date().required(),
  ubicacion: _joi["default"].string().required(),
  precio_entrada: _joi["default"].number().precision(2).required(),
  estado: _joi["default"].string().valid('borrador', 'publicado', 'finalizado')["default"]('borrador'),
  imagen_destacada: _joi["default"].string().uri().allow(null, '')
});

var index = function index(req, res) {
  var userId, eventos;
  return regeneratorRuntime.async(function index$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _eventoModel.getEventosByUserId)(userId));

        case 4:
          eventos = _context.sent;

          if (!(eventos.length === 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'No hay eventos para este usuario'
          }));

        case 7:
          res.json(eventos);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error al obtener los eventos',
            error: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.index = index;

var show = function show(req, res) {
  var evento, _ref, _ref2, results;

  return regeneratorRuntime.async(function show$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          evento = req.params.evento;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _eventoModel.getEventoById)(evento));

        case 4:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];

          if (!(results.length === 0)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado'
          }));

        case 9:
          res.json(results[0]);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: 'Error al obtener el evento',
            error: _context2.t0.message
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.show = show;

var store = function store(req, res) {
  var _eventoSchema$validat, error, _req$body, empresa_id, titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, user_id, existing, result;

  return regeneratorRuntime.async(function store$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _eventoSchema$validat = eventoSchema.validate(req.body), error = _eventoSchema$validat.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'El campo ' + error.details[0].context.key + ' es obligatorio o inválido'
          }));

        case 3:
          _req$body = req.body, empresa_id = _req$body.empresa_id, titulo = _req$body.titulo, slug = _req$body.slug, descripcion = _req$body.descripcion, fecha_inicio = _req$body.fecha_inicio, fecha_fin = _req$body.fecha_fin, ubicacion = _req$body.ubicacion, precio_entrada = _req$body.precio_entrada, estado = _req$body.estado, imagen_destacada = _req$body.imagen_destacada;
          user_id = req.user.id;
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap((0, _eventoModel.checkEventoExistsBySlug)(slug));

        case 8:
          existing = _context3.sent;

          if (!(existing.length > 0)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "Ya existe un evento con el slug: ".concat(slug)
          }));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap((0, _eventoModel.createEvento)({
            empresa_id: empresa_id,
            user_id: user_id,
            titulo: titulo,
            slug: slug,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            ubicacion: ubicacion,
            precio_entrada: precio_entrada,
            estado: estado,
            imagen_destacada: imagen_destacada
          }));

        case 13:
          result = _context3.sent;
          res.status(201).json({
            message: 'Evento creado con éxito',
            evento: {
              id: result.insertId,
              titulo: titulo,
              slug: slug
            }
          });
          _context3.next = 20;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](5);
          res.status(500).json({
            message: 'Hubo un problema al crear el evento. Intenta nuevamente.',
            error: _context3.t0.message
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 17]]);
};

exports.store = store;

var update = function update(req, res) {
  var eventoId, _eventoSchema$validat2, error, result;

  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          eventoId = req.params.id;
          _eventoSchema$validat2 = eventoSchema.validate(req.body), error = _eventoSchema$validat2.error;

          if (!error) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 4:
          _context4.prev = 4;
          _context4.next = 7;
          return regeneratorRuntime.awrap((0, _eventoModel.updateEvento)(eventoId, req.body));

        case 7:
          result = _context4.sent;

          if (!(result.affectedRows === 0)) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado o no tienes permiso para editarlo'
          }));

        case 10:
          res.json({
            message: 'Evento actualizado correctamente'
          });
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](4);
          res.status(500).json({
            message: 'Error al actualizar el evento',
            error: _context4.t0.message
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 13]]);
};

exports.update = update;

var destroy = function destroy(req, res) {
  var evento, user_id, result;
  return regeneratorRuntime.async(function destroy$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          evento = req.params.evento;
          user_id = req.user.id;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap((0, _eventoModel.softDeleteEvento)(evento, user_id));

        case 5:
          result = _context5.sent;

          if (!(result.affectedRows === 0)) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado o no tienes permiso para eliminarlo'
          }));

        case 8:
          res.json({
            message: 'Evento eliminado correctamente'
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json({
            message: 'Error al eliminar el evento',
            error: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.destroy = destroy;