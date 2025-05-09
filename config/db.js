import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('api-app-servicio-movil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
