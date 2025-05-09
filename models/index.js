import sequelize from '../config/db.js';
import User from '../models/User.js';
import Servicio from '../models/Servicio.js';
import Vehiculo from '../models/Vehiculo.js';
import Negociacion from '../models/negociacion.js';

// Definir relaciones
User.hasMany(Servicio, { foreignKey: 'cliente_id', as: 'servicios' });
Vehiculo.hasMany(Servicio, { foreignKey: 'vehiculo_id', as: 'servicios' });


const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');

    await sequelize.sync(); // Solo una vez

    console.log('Modelos sincronizados.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};

syncModels();

export {
  sequelize,
  User,
  Servicio,
  Vehiculo,
  Negociacion,
};
