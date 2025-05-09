"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.store = exports.show = exports.index = exports.EventosPrecioCero = exports.EventosProximos = exports.EventosDestacados = exports.iAll = void 0;

var _eventoModel = require("../models/eventoModel.js");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var iAll = function iAll(req, res) {
  var evento;
  return regeneratorRuntime.async(function iAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _eventoModel.getAll)());

        case 3:
          evento = _context.sent;
          res.json(evento);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error al obtener los evento',
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

var EventosDestacados = function EventosDestacados(req, res) {
  var evento;
  return regeneratorRuntime.async(function EventosDestacados$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _eventoModel.getDestacados)());

        case 3:
          evento = _context2.sent;

          if (!(!evento || evento.length === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'No hay eventos destacados disponibles'
          }));

        case 6:
          // Si los eventos se obtuvieron correctamente, los devolveremos
          res.json(evento);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          // Si hay algún error, registrar detalles adicionales para ayudar a la depuración
          //  console.error('Error al obtener eventos destacados:', err);
          res.status(500).json({
            message: 'Error al obtener los eventos',
            error: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.EventosDestacados = EventosDestacados;

var EventosProximos = function EventosProximos(req, res) {
  var evento;
  return regeneratorRuntime.async(function EventosProximos$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _eventoModel.getProximosEventos)());

        case 3:
          evento = _context3.sent;
          res.json(evento);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Error al obtener los evento',
            error: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.EventosProximos = EventosProximos;

var EventosPrecioCero = function EventosPrecioCero(req, res) {
  var eventos;
  return regeneratorRuntime.async(function EventosPrecioCero$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _eventoModel.getEventosPrecioCero)());

        case 3:
          eventos = _context4.sent;
          res.json(eventos); // Devuelve los eventos con precio cero

          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: 'Error al obtener los eventos con precio cero',
            error: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.EventosPrecioCero = EventosPrecioCero;

var index = function index(req, res) {
  var userId, eventos;
  return regeneratorRuntime.async(function index$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log('USER DESDE TOKEN:', req.user);
          userId = req.user.id;
          _context5.next = 5;
          return regeneratorRuntime.awrap((0, _eventoModel.getEventosByUserId)(userId));

        case 5:
          eventos = _context5.sent;
          res.json(eventos); // Devuelve siempre un array, aunque esté vacío

          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: 'Error al obtener los eventos',
            error: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.index = index;

var show = function show(req, res) {
  var id, results;
  return regeneratorRuntime.async(function show$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap((0, _eventoModel.getById)(id, req.user.id));

        case 4:
          results = _context6.sent;

          if (!(results.length === 0)) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado'
          }));

        case 7:
          res.json(results[0]);
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            message: 'Error al obtener el evento',
            error: _context6.t0.message
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.show = show;

var store = function store(req, res) {
  var _eventoSchema$validat, error, _req$body, empresa_id, titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, user_id, existing, result;

  return regeneratorRuntime.async(function store$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _eventoSchema$validat = eventoSchema.validate(req.body), error = _eventoSchema$validat.error; // Verifica si hay errores en la validación

          if (!error) {
            _context7.next = 4;
            break;
          }

          console.log('Error de validación:', error);
          return _context7.abrupt("return", res.status(400).json({
            message: 'Datos inválidos',
            error: error.details
          }));

        case 4:
          _req$body = req.body, empresa_id = _req$body.empresa_id, titulo = _req$body.titulo, slug = _req$body.slug, descripcion = _req$body.descripcion, fecha_inicio = _req$body.fecha_inicio, fecha_fin = _req$body.fecha_fin, ubicacion = _req$body.ubicacion, precio_entrada = _req$body.precio_entrada, estado = _req$body.estado, imagen_destacada = _req$body.imagen_destacada;
          user_id = req.user.id;
          console.log('Datos recibidos para crear el evento:', {
            empresa_id: empresa_id,
            titulo: titulo,
            slug: slug,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            ubicacion: ubicacion,
            precio_entrada: precio_entrada,
            estado: estado,
            imagen_destacada: imagen_destacada,
            user_id: user_id
          });
          _context7.prev = 7;
          _context7.next = 10;
          return regeneratorRuntime.awrap((0, _eventoModel.checkEventoExistsBySlug)(slug));

        case 10:
          existing = _context7.sent;
          console.log('Evento con el mismo slug encontrado:', existing);

          if (!(existing.length > 0)) {
            _context7.next = 15;
            break;
          }

          console.log("El evento con el slug ".concat(slug, " ya existe."));
          return _context7.abrupt("return", res.status(400).json({
            message: "Ya existe un evento con el slug: ".concat(slug)
          }));

        case 15:
          _context7.next = 17;
          return regeneratorRuntime.awrap((0, _eventoModel.create)({
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

        case 17:
          result = _context7.sent;
          console.log('Evento creado con éxito:', result);
          res.status(201).json({
            message: 'Evento creado con éxito',
            evento: {
              id: result.insertId,
              titulo: titulo,
              slug: slug
            }
          });
          _context7.next = 26;
          break;

        case 22:
          _context7.prev = 22;
          _context7.t0 = _context7["catch"](7);
          console.log('Error al crear el evento:', _context7.t0);
          res.status(500).json({
            message: 'Hubo un problema al crear el evento. Intenta nuevamente.',
            error: _context7.t0.message
          });

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[7, 22]]);
};

exports.store = store;

var update = function update(req, res) {
  var eventoId, _req$body2, created_at, updated_at, deleted_at, user_id, eventoData, _eventoSchema$validat2, error, result;

  return regeneratorRuntime.async(function update$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          eventoId = req.params.id;
          console.log('ID del evento a actualizar:', eventoId); // Eliminar campos no deseados como "created_at" y "user_id" antes de la validación

          _req$body2 = req.body, created_at = _req$body2.created_at, updated_at = _req$body2.updated_at, deleted_at = _req$body2.deleted_at, user_id = _req$body2.user_id, eventoData = _objectWithoutProperties(_req$body2, ["created_at", "updated_at", "deleted_at", "user_id"]);
          _eventoSchema$validat2 = eventoSchema.validate(eventoData), error = _eventoSchema$validat2.error;

          if (!error) {
            _context8.next = 7;
            break;
          }

          console.log('Error de validación:', error.details[0].message);
          return _context8.abrupt("return", res.status(400).json({
            message: error.details[0].message
          }));

        case 7:
          _context8.prev = 7;
          console.log('Datos del evento recibidos para actualización:', eventoData);
          _context8.next = 11;
          return regeneratorRuntime.awrap((0, _eventoModel.updateEvento)(eventoId, eventoData));

        case 11:
          result = _context8.sent;
          console.log('Resultado de la actualización:', result);

          if (!(result.affectedRows === 0)) {
            _context8.next = 16;
            break;
          }

          console.log('Evento no encontrado o sin permisos de edición');
          return _context8.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado o no tienes permiso para editarlo'
          }));

        case 16:
          console.log('Evento actualizado correctamente');
          res.json({
            message: 'Evento actualizado correctamente'
          });
          _context8.next = 24;
          break;

        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](7);
          console.log('Error al actualizar el evento:', _context8.t0.message);
          res.status(500).json({
            message: 'Error al actualizar el evento',
            error: _context8.t0.message
          });

        case 24:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[7, 20]]);
};

exports.update = update;

var destroy = function destroy(req, res) {
  var id, user_id, result;
  return regeneratorRuntime.async(function destroy$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          user_id = req.user.id;
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap((0, _eventoModel.softDelete)(id, user_id));

        case 5:
          result = _context9.sent;

          if (!(result.affectedRows === 0)) {
            _context9.next = 8;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            message: 'Evento no encontrado o no tienes permiso para eliminarlo'
          }));

        case 8:
          res.json({
            message: 'Evento eliminado correctamente'
          });
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](2);
          res.status(500).json({
            message: 'Error al eliminar el evento',
            error: _context9.t0.message
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

exports.destroy = destroy;