"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var db_js_1 = require("../config/db.js");
var user_js_1 = require("./user.js");
var Servicio = /** @class */ (function (_super) {
    __extends(Servicio, _super);
    function Servicio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Servicio;
}(sequelize_1.Model));
Servicio.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: sequelize_1.DataTypes.STRING,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_js_1["default"],
    modelName: 'Servicio',
    tableName: 'servicios',
    timestamps: true
});
// Relaciones
user_js_1["default"].hasMany(Servicio, { foreignKey: 'userId' });
Servicio.belongsTo(user_js_1["default"], { foreignKey: 'userId' });
exports["default"] = Servicio;
