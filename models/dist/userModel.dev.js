"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restoreUserByUsername = exports.softDeleteUser = exports.updateUser = exports.getUserWithRelations = exports["default"] = void 0;

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UserModel = {
  getUserWithRelations: function getUserWithRelations(userId) {
    var _ref, _ref2, rows;

    return regeneratorRuntime.async(function getUserWithRelations$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT id, name, username, email, tipo_usuario, foto_perfil, created_at, updated_at\n       FROM users\n       WHERE id = ? AND deleted_at IS NULL", [userId]));

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            rows = _ref2[0];
            return _context.abrupt("return", rows[0]);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  updateUser: function updateUser(userId, data) {
    var campos, valores, campo, _ref3, _ref4, result;

    return regeneratorRuntime.async(function updateUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            campos = [];
            valores = [];

            for (campo in data) {
              campos.push("".concat(campo, " = ?"));
              valores.push(data[campo]);
            }

            valores.push(userId);
            _context2.next = 6;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE users SET ".concat(campos.join(', '), ", updated_at = NOW() WHERE id = ? AND deleted_at IS NULL"), valores));

          case 6:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            result = _ref4[0];
            return _context2.abrupt("return", result);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  softDeleteUser: function softDeleteUser(userId) {
    var _ref5, _ref6, result;

    return regeneratorRuntime.async(function softDeleteUser$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL", [userId]));

          case 2:
            _ref5 = _context3.sent;
            _ref6 = _slicedToArray(_ref5, 1);
            result = _ref6[0];
            return _context3.abrupt("return", result);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  restoreUserByUsername: function restoreUserByUsername(username) {
    var _ref7, _ref8, rows, user;

    return regeneratorRuntime.async(function restoreUserByUsername$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_db["default"].query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]));

          case 2:
            _ref7 = _context4.sent;
            _ref8 = _slicedToArray(_ref7, 1);
            rows = _ref8[0];
            user = rows[0];

            if (!(user && user.deleted_at !== null)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 9;
            return regeneratorRuntime.awrap(_db["default"].query("UPDATE users SET deleted_at = NULL, updated_at = NOW() WHERE id = ?", [user.id]));

          case 9:
            return _context4.abrupt("return", user);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};
var _default = UserModel;
exports["default"] = _default;
var getUserWithRelations = UserModel.getUserWithRelations,
    updateUser = UserModel.updateUser,
    softDeleteUser = UserModel.softDeleteUser,
    restoreUserByUsername = UserModel.restoreUserByUsername;
exports.restoreUserByUsername = restoreUserByUsername;
exports.softDeleteUser = softDeleteUser;
exports.updateUser = updateUser;
exports.getUserWithRelations = getUserWithRelations;