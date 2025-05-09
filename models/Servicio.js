import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from '../models/User.js';
import Vehiculo from '../models/Vehiculo.js';

class Servicio extends Model {}

Servicio.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  cliente_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  vehiculo_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  precio_final: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'negociando', 'aceptado', 'finalizado', 'cancelado'),
    defaultValue: 'pendiente',
  },
}, {
  sequelize,
  modelName: 'Servicio',
  tableName: 'servicios',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  paranoid: true,
});

//Relaciones aquí, después de init
Servicio.belongsTo(User, {
  foreignKey: 'cliente_id',
  as: 'cliente',
});
Servicio.belongsTo(Vehiculo, {
  foreignKey: 'vehiculo_id',
  as: 'vehiculo',
});


export default Servicio;
