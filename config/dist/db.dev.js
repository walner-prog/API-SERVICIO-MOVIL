"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var sequelize = new _sequelize.Sequelize('api-app-servicio-movil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});
var _default = sequelize;
exports["default"] = _default;