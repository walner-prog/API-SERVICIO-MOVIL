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
var User_1 = require("./User");
var Vehiculo = /** @class */ (function (_super) {
    __extends(Vehiculo, _super);
    function Vehiculo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Vehiculo;
}(sequelize_1.Model));
Vehiculo.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    marca: sequelize_1.DataTypes.STRING,
    modelo: sequelize_1.DataTypes.STRING,
    anio: sequelize_1.DataTypes.INTEGER,
    color: sequelize_1.DataTypes.STRING,
    placa: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    capacidad: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 4
    },
    foto_vehiculo: sequelize_1.DataTypes.STRING,
    deleted_at: sequelize_1.DataTypes.DATE
}, {
    sequelize: db_js_1["default"],
    modelName: 'vehiculo',
    tableName: 'vehiculos',
    timestamps: true,
    paranoid: true
});
Vehiculo.belongsTo(User_1["default"], { foreignKey: 'user_id', as: 'conductor' });
exports["default"] = Vehiculo;
