import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

class Vehiculo extends Model {}

Vehiculo.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.ENUM('moto', 'carro', 'camion', 'bus'), allowNull: false },
  marca: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.STRING, allowNull: false },
  placa: { type: DataTypes.STRING, allowNull: false, unique: true },
  capacidad: { type: DataTypes.INTEGER, allowNull: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    field: 'user_id' // <--- esta línea es clave
  },
}, {
  sequelize,
  modelName: 'Vehiculo',
  tableName: 'vehiculos',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
});

User.hasMany(Vehiculo, { foreignKey: 'userId' });
Vehiculo.belongsTo(User, { foreignKey: 'userId' });




export default Vehiculo;
