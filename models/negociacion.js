import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Servicio from './Servicio.js';

class Negociacion extends Model {}

Negociacion.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  monto_ofrecido: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servicio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Negociacion',
  tableName: 'negociaciones',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true, // Para soft delete
});

// Relaciones
User.hasMany(Negociacion, { foreignKey: 'usuario_id' });
Negociacion.belongsTo(User, { foreignKey: 'usuario_id' });

Servicio.hasMany(Negociacion, { foreignKey: 'servicio_id' });
Negociacion.belongsTo(Servicio, { foreignKey: 'servicio_id' });

export default Negociacion;
