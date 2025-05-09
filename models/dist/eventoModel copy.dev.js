"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEventoExistsBySlug = exports.getEventosByEmpresaId = exports.softDelete = exports.updateEvento = exports.create = exports.getById = exports.getAll = exports["default"] = void 0;

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EventoModel = {
  getAll: function getAll() {
    var _ref, _ref2, rows;

    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM eventos WHERE deleted_at IS NULL"));

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            rows = _ref2[0];
            return _context.abrupt("return", rows);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getById: function getById(id) {
    var _ref3, _ref4, rows;

    return regeneratorRuntime.async(function getById$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM eventos WHERE id = ? AND deleted_at IS NULL", [id]));

          case 2:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            rows = _ref4[0];
            return _context2.abrupt("return", rows);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  create: function create(evento) {
    var empresa_id, user_id, titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, _ref5, _ref6, result;

    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            empresa_id = evento.empresa_id, user_id = evento.user_id, titulo = evento.titulo, slug = evento.slug, descripcion = evento.descripcion, fecha_inicio = evento.fecha_inicio, fecha_fin = evento.fecha_fin, ubicacion = evento.ubicacion, precio_entrada = evento.precio_entrada, estado = evento.estado, imagen_destacada = evento.imagen_destacada;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("INSERT INTO eventos \n      (empresa_id, user_id, titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, created_at, updated_at)\n      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())", [empresa_id, user_id, titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada]));

          case 3:
            _ref5 = _context3.sent;
            _ref6 = _slicedToArray(_ref5, 1);
            result = _ref6[0];
            return _context3.abrupt("return", result);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  updateEvento: function updateEvento(id, evento) {
    var titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, _ref7, _ref8, result;

    return regeneratorRuntime.async(function updateEvento$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            titulo = evento.titulo, slug = evento.slug, descripcion = evento.descripcion, fecha_inicio = evento.fecha_inicio, fecha_fin = evento.fecha_fin, ubicacion = evento.ubicacion, precio_entrada = evento.precio_entrada, estado = evento.estado, imagen_destacada = evento.imagen_destacada;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE eventos \n       SET titulo = ?, slug = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, \n           ubicacion = ?, precio_entrada = ?, estado = ?, imagen_destacada = ?, updated_at = NOW()\n       WHERE id = ? AND deleted_at IS NULL", [titulo, slug, descripcion, fecha_inicio, fecha_fin, ubicacion, precio_entrada, estado, imagen_destacada, id]));

          case 3:
            _ref7 = _context4.sent;
            _ref8 = _slicedToArray(_ref7, 1);
            result = _ref8[0];
            return _context4.abrupt("return", result);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  softDelete: function softDelete(id, user_id) {
    var _ref9, _ref10, result;

    return regeneratorRuntime.async(function softDelete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE eventos SET deleted_at = NOW()\n       WHERE id = ? AND user_id = ? AND deleted_at IS NULL", [id, user_id]));

          case 2:
            _ref9 = _context5.sent;
            _ref10 = _slicedToArray(_ref9, 1);
            result = _ref10[0];
            return _context5.abrupt("return", result);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  getEventosByEmpresaId: function getEventosByEmpresaId(empresa_id) {
    var _ref11, _ref12, rows;

    return regeneratorRuntime.async(function getEventosByEmpresaId$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM eventos WHERE empresa_id = ? AND deleted_at IS NULL", [empresa_id]));

          case 2:
            _ref11 = _context6.sent;
            _ref12 = _slicedToArray(_ref11, 1);
            rows = _ref12[0];
            return _context6.abrupt("return", rows);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  checkEventoExistsBySlug: function checkEventoExistsBySlug(slug) {
    var _ref13, _ref14, rows;

    return regeneratorRuntime.async(function checkEventoExistsBySlug$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM eventos WHERE slug = ? AND deleted_at IS NULL", [slug]));

          case 2:
            _ref13 = _context7.sent;
            _ref14 = _slicedToArray(_ref13, 1);
            rows = _ref14[0];
            return _context7.abrupt("return", rows);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    });
  }
};
var _default = EventoModel;
exports["default"] = _default;
var getAll = EventoModel.getAll,
    getById = EventoModel.getById,
    create = EventoModel.create,
    updateEvento = EventoModel.updateEvento,
    softDelete = EventoModel.softDelete,
    getEventosByEmpresaId = EventoModel.getEventosByEmpresaId,
    checkEventoExistsBySlug = EventoModel.checkEventoExistsBySlug;
exports.checkEventoExistsBySlug = checkEventoExistsBySlug;
exports.getEventosByEmpresaId = getEventosByEmpresaId;
exports.softDelete = softDelete;
exports.updateEvento = updateEvento;
exports.create = create;
exports.getById = getById;
exports.getAll = getAll;