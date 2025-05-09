"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../config/db.js"));

var _User = _interopRequireDefault(require("./User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Vehiculo =
/*#__PURE__*/
function (_Model) {
  _inherits(Vehiculo, _Model);

  function Vehiculo() {
    _classCallCheck(this, Vehiculo);

    return _possibleConstructorReturn(this, _getPrototypeOf(Vehiculo).apply(this, arguments));
  }

  return Vehiculo;
}(_sequelize.Model);

Vehiculo.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: _sequelize.DataTypes.ENUM('moto', 'carro', 'camion', 'bus'),
    allowNull: false
  },
  marca: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  placa: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  capacidad: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  userId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id' // <--- esta línea es clave

  }
}, {
  sequelize: _db["default"],
  modelName: 'Vehiculo',
  tableName: 'vehiculos',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true
});

_User["default"].hasMany(Vehiculo, {
  foreignKey: 'userId'
});

Vehiculo.belongsTo(_User["default"], {
  foreignKey: 'userId'
});
var _default = Vehiculo;
exports["default"] = _default;