"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
// db.ts
var sequelize_typescript_1 = require("sequelize-typescript");
var User_1 = require("../models/User");
var Servicio_1 = require("../models/Servicio");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'tu_base_de_datos',
    models: [User_1.User, Servicio_1.Servicio]
});
