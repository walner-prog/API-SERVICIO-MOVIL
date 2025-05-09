"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var User =
/*#__PURE__*/
function (_Model) {
  _inherits(User, _Model);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, _getPrototypeOf(User).apply(this, arguments));
  }

  return User;
}(_sequelize.Model);

User.init({
  id: {
    type: _sequelize.DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email_verified_at: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  telefono: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  tipo_usuario: {
    type: _sequelize.DataTypes.ENUM('Cliente', 'Conductor'),
    defaultValue: 'Cliente'
  },
  foto_perfil: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  cedula: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  latitud: {
    type: _sequelize.DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  longitud: {
    type: _sequelize.DataTypes.DECIMAL(10, 7),
    allowNull: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  remember_token: {
    type: _sequelize.DataTypes.STRING(100),
    allowNull: true
  },
  verification_token: {
    type: _sequelize.DataTypes.STRING(100),
    allowNull: true
  },
  deleted_at: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  created_at: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: _db["default"],
  modelName: 'User',
  tableName: 'users',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  paranoid: true // habilita soft deletes usando deletedAt

});
var _default = User;
exports["default"] = _default;