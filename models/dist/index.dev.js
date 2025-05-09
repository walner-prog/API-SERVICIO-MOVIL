"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sequelize", {
  enumerable: true,
  get: function get() {
    return _db["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _User["default"];
  }
});
Object.defineProperty(exports, "Servicio", {
  enumerable: true,
  get: function get() {
    return _Servicio["default"];
  }
});
Object.defineProperty(exports, "Vehiculo", {
  enumerable: true,
  get: function get() {
    return _Vehiculo["default"];
  }
});
Object.defineProperty(exports, "Negociacion", {
  enumerable: true,
  get: function get() {
    return _negociacion["default"];
  }
});

var _db = _interopRequireDefault(require("../config/db.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Servicio = _interopRequireDefault(require("../models/Servicio.js"));

var _Vehiculo = _interopRequireDefault(require("../models/Vehiculo.js"));

var _negociacion = _interopRequireDefault(require("../models/negociacion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Definir relaciones
_User["default"].hasMany(_Servicio["default"], {
  foreignKey: 'cliente_id',
  as: 'servicios'
});

_Vehiculo["default"].hasMany(_Servicio["default"], {
  foreignKey: 'vehiculo_id',
  as: 'servicios'
});

var syncModels = function syncModels() {
  return regeneratorRuntime.async(function syncModels$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db["default"].authenticate());

        case 3:
          console.log('Conexión establecida con éxito.');
          _context.next = 6;
          return regeneratorRuntime.awrap(_db["default"].sync());

        case 6:
          // Solo una vez
          console.log('Modelos sincronizados.');
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error al sincronizar modelos:', _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

syncModels();