import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {}

User.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_usuario: {
    type: DataTypes.ENUM('Cliente', 'Conductor'),
    defaultValue: 'Cliente',
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true,
  },
  longitud: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remember_token: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  verification_token: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  timestamps: true,
  paranoid: true, // habilita soft deletes usando deletedAt
});



export default User;
