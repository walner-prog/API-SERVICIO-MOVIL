"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../config/db.js"));

var _User = _interopRequireDefault(require("./User.js"));

var _Servicio = _interopRequireDefault(require("./Servicio.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Negociacion =
/*#__PURE__*/
function (_Model) {
  _inherits(Negociacion, _Model);

  function Negociacion() {
    _classCallCheck(this, Negociacion);

    return _possibleConstructorReturn(this, _getPrototypeOf(Negociacion).apply(this, arguments));
  }

  return Negociacion;
}(_sequelize.Model);

Negociacion.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  monto_ofrecido: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: false
  },
  comentario: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  usuario_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  servicio_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: _db["default"],
  modelName: 'Negociacion',
  tableName: 'negociaciones',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true // Para soft delete

}); // Relaciones

_User["default"].hasMany(Negociacion, {
  foreignKey: 'usuario_id'
});

Negociacion.belongsTo(_User["default"], {
  foreignKey: 'usuario_id'
});

_Servicio["default"].hasMany(Negociacion, {
  foreignKey: 'servicio_id'
});

Negociacion.belongsTo(_Servicio["default"], {
  foreignKey: 'servicio_id'
});
var _default = Negociacion;
exports["default"] = _default;