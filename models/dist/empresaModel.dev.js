"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmpresasConEventosByUserId = exports.getEmpresaByUserId = exports.checkEmpresaExistsByNameUpdate = exports.checkEmpresaExistsByName = exports.softDelete = exports.updateEmpresa = exports.create = exports.getById = exports.getAll = exports["default"] = void 0;

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var EmpresaModel = {
  getAll: function getAll() {
    var _ref, _ref2, rows;

    return regeneratorRuntime.async(function getAll$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM empresas WHERE deleted_at IS NULL"));

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
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM empresas WHERE id = ? AND deleted_at IS NULL", [id]));

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
  create: function create(empresa) {
    var user_id, nombre_comercial, ruc, telefono, direccion, logo_url, _ref5, _ref6, result;

    return regeneratorRuntime.async(function create$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user_id = empresa.user_id, nombre_comercial = empresa.nombre_comercial, ruc = empresa.ruc, telefono = empresa.telefono, direccion = empresa.direccion, logo_url = empresa.logo_url;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("INSERT INTO empresas (user_id, nombre_comercial, ruc, telefono, direccion, logo_url, created_at, updated_at)\n             VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())", [user_id, nombre_comercial, ruc, telefono, direccion, logo_url]));

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
  updateEmpresa: function updateEmpresa(id, empresa) {
    var nombre_comercial, ruc, telefono, direccion, logo_url, _ref7, _ref8, result;

    return regeneratorRuntime.async(function updateEmpresa$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            nombre_comercial = empresa.nombre_comercial, ruc = empresa.ruc, telefono = empresa.telefono, direccion = empresa.direccion, logo_url = empresa.logo_url;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE empresas\n             SET nombre_comercial = ?, ruc = ?, telefono = ?, direccion = ?, logo_url = ?, updated_at = NOW()\n             WHERE id = ? AND deleted_at IS NULL", [nombre_comercial, ruc, telefono, direccion, logo_url, id]));

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
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE empresas SET deleted_at = NOW()\n             WHERE id = ? AND user_id = ? AND deleted_at IS NULL", [id, user_id]));

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
  checkEmpresaExistsByName: function checkEmpresaExistsByName(user_id, nombre_comercial) {
    var _ref11, _ref12, rows;

    return regeneratorRuntime.async(function checkEmpresaExistsByName$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM empresas WHERE user_id = ? AND nombre_comercial = ? AND deleted_at IS NULL", [user_id, nombre_comercial]));

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
  checkEmpresaExistsByNameUpdate: function checkEmpresaExistsByNameUpdate(userId, nombre_comercial) {
    var empresaId,
        query,
        params,
        _ref13,
        _ref14,
        rows,
        _args7 = arguments;

    return regeneratorRuntime.async(function checkEmpresaExistsByNameUpdate$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            empresaId = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : null;
            query = 'SELECT id FROM empresas WHERE nombre_comercial = ? AND deleted_at IS NULL';
            params = [nombre_comercial]; // Si se pasa un `empresaId`, excluimos esa empresa de la búsqueda para permitir su propio nombre

            if (empresaId) {
              query += ' AND id != ?'; // Excluir la empresa que estamos actualizando

              params.push(empresaId);
            }

            _context7.next = 6;
            return regeneratorRuntime.awrap(_db["default"].query(query, params));

          case 6:
            _ref13 = _context7.sent;
            _ref14 = _slicedToArray(_ref13, 1);
            rows = _ref14[0];
            return _context7.abrupt("return", rows);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getEmpresaByUserId: function getEmpresaByUserId(userId) {
    var _ref15, _ref16, rows;

    return regeneratorRuntime.async(function getEmpresaByUserId$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM empresas WHERE user_id = ? AND deleted_at IS NULL", [userId]));

          case 3:
            _ref15 = _context8.sent;
            _ref16 = _slicedToArray(_ref15, 1);
            rows = _ref16[0];
            return _context8.abrupt("return", rows);

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            throw new Error('No se pudo obtener la empresa del usuario');

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  getEmpresasConEventosByUserId: function getEmpresasConEventosByUserId(userId) {
    var _ref17, _ref18, rows, empresas, map, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row;

    return regeneratorRuntime.async(function getEmpresasConEventosByUserId$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return regeneratorRuntime.awrap(_db["default"].query("\n        SELECT \n          e.id AS empresa_id, e.nombre_comercial, e.ruc, e.telefono, e.direccion, e.logo_url,\n          ev.id AS evento_id, ev.titulo, ev.slug, ev.descripcion, ev.fecha_inicio, ev.fecha_fin,\n          ev.ubicacion, ev.precio_entrada, ev.estado, ev.imagen_destacada\n        FROM empresas e\n        LEFT JOIN eventos ev ON e.id = ev.empresa_id AND ev.deleted_at IS NULL\n        WHERE e.user_id = ? AND e.deleted_at IS NULL\n        ORDER BY e.id DESC, ev.fecha_inicio ASC\n      ", [userId]));

          case 3:
            _ref17 = _context9.sent;
            _ref18 = _slicedToArray(_ref17, 1);
            rows = _ref18[0];
            // Agrupar los eventos por empresa
            empresas = [];
            map = new Map();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context9.prev = 11;

            for (_iterator = rows[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              row = _step.value;

              if (!map.has(row.empresa_id)) {
                map.set(row.empresa_id, {
                  id: row.empresa_id,
                  nombre_comercial: row.nombre_comercial,
                  ruc: row.ruc,
                  telefono: row.telefono,
                  direccion: row.direccion,
                  logo_url: row.logo_url,
                  eventos: []
                });
                empresas.push(map.get(row.empresa_id));
              }

              if (row.evento_id) {
                map.get(row.empresa_id).eventos.push({
                  id: row.evento_id,
                  titulo: row.titulo,
                  slug: row.slug,
                  descripcion: row.descripcion,
                  fecha_inicio: row.fecha_inicio,
                  fecha_fin: row.fecha_fin,
                  ubicacion: row.ubicacion,
                  precio_entrada: row.precio_entrada,
                  estado: row.estado,
                  imagen_destacada: row.imagen_destacada
                });
              }
            }

            _context9.next = 19;
            break;

          case 15:
            _context9.prev = 15;
            _context9.t0 = _context9["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context9.t0;

          case 19:
            _context9.prev = 19;
            _context9.prev = 20;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 22:
            _context9.prev = 22;

            if (!_didIteratorError) {
              _context9.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context9.finish(22);

          case 26:
            return _context9.finish(19);

          case 27:
            return _context9.abrupt("return", empresas);

          case 30:
            _context9.prev = 30;
            _context9.t1 = _context9["catch"](0);
            throw new Error('No se pudieron obtener las empresas y sus eventos');

          case 33:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 30], [11, 15, 19, 27], [20,, 22, 26]]);
  }
};
var _default = EmpresaModel;
exports["default"] = _default;
var getAll = EmpresaModel.getAll,
    getById = EmpresaModel.getById,
    create = EmpresaModel.create,
    updateEmpresa = EmpresaModel.updateEmpresa,
    softDelete = EmpresaModel.softDelete,
    checkEmpresaExistsByName = EmpresaModel.checkEmpresaExistsByName,
    checkEmpresaExistsByNameUpdate = EmpresaModel.checkEmpresaExistsByNameUpdate,
    getEmpresaByUserId = EmpresaModel.getEmpresaByUserId,
    getEmpresasConEventosByUserId = EmpresaModel.getEmpresasConEventosByUserId;
exports.getEmpresasConEventosByUserId = getEmpresasConEventosByUserId;
exports.getEmpresaByUserId = getEmpresaByUserId;
exports.checkEmpresaExistsByNameUpdate = checkEmpresaExistsByNameUpdate;
exports.checkEmpresaExistsByName = checkEmpresaExistsByName;
exports.softDelete = softDelete;
exports.updateEmpresa = updateEmpresa;
exports.create = create;
exports.getById = getById;
exports.getAll = getAll;