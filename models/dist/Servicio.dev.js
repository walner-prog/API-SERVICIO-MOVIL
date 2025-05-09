"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../config/db.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _Vehiculo = _interopRequireDefault(require("../models/Vehiculo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Servicio =
/*#__PURE__*/
function (_Model) {
  _inherits(Servicio, _Model);

  function Servicio() {
    _classCallCheck(this, Servicio);

    return _possibleConstructorReturn(this, _getPrototypeOf(Servicio).apply(this, arguments));
  }

  return Servicio;
}(_sequelize.Model);

Servicio.init({
  id: {
    type: _sequelize.DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_id: {
    type: _sequelize.DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  vehiculo_id: {
    type: _sequelize.DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  origen: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  destino: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  fecha_hora: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  precio_final: {
    type: _sequelize.DataTypes.DECIMAL(8, 2),
    allowNull: true
  },
  estado: {
    type: _sequelize.DataTypes.ENUM('pendiente', 'negociando', 'aceptado', 'finalizado', 'cancelado'),
    defaultValue: 'pendiente'
  }
}, {
  sequelize: _db["default"],
  modelName: 'Servicio',
  tableName: 'servicios',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  paranoid: true
}); //Relaciones aquí, después de init

Servicio.belongsTo(_User["default"], {
  foreignKey: 'cliente_id',
  as: 'cliente'
});
Servicio.belongsTo(_Vehiculo["default"], {
  foreignKey: 'vehiculo_id',
  as: 'vehiculo'
});
var _default = Servicio;
exports["default"] = _default;