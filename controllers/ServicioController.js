import Joi from 'joi';
import { Op } from 'sequelize';
import Servicio from '../models/Servicio.js';
import Vehiculo from '../models/Vehiculo.js';
import User from '../models/User.js';

// 🎯 Validación con Joi
const servicioSchema = Joi.object({
  vehiculo_id: Joi.number().required().messages({
    'number.base': 'El ID del vehículo debe ser un número',
    'number.empty': 'El ID del vehículo es obligatorio',
    'any.required': 'El ID del vehículo es obligatorio',
    
  }),
  
  origen: Joi.string().required().messages({
    'string.empty': 'El origen es obligatorio',

  }),
  destino: Joi.string().required().messages({
    'string.empty': 'El destino es obligatorio',
  }),
     
  fecha_hora: Joi.date().iso().required().messages({
    'date.base': 'La fecha y hora deben ser una fecha válida',
    'date.empty': 'La fecha y hora son obligatorias',
  }),
  precio_final: Joi.number().optional().messages({
    'number.base': 'El precio final debe ser un número',
    'number.empty': 'El precio final no puede estar vacío',
  }),
  estado: Joi.string().valid('pendiente', 'negociando', 'aceptado', 'finalizado', 'cancelado').optional().messages({
    'any.only': 'El estado debe ser uno de los siguientes: pendiente, negociando, aceptado, finalizado, cancelado',
    'string.empty': 'El estado no puede estar vacío',
  }),
});

// 📄 GET /todos-los-servicios
export const index = async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      include: [
        { model: User, as: 'cliente', attributes: ['id', 'name', 'email'] },
        { model: Vehiculo, as: 'vehiculo' }
      ],

      order: [['created_at', 'DESC']],
      
    });
    
    console.log('servicios', servicios),
    res.json(servicios);
  } catch (error) {
    console.error('Error en index servicios:', error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

// 👤 GET /servicios-me (servicios del usuario autenticado)
export const userMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const servicios = await Servicio.findAll({
      where: { cliente_id: userId },
      include: [{ model: Vehiculo, as: 'vehiculo' }],
      order: [['created_at', 'DESC']],
    });

    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios del usuario' });
  }
};

// 🆕 POST /servicios
export const store = async (req, res) => {
  try {
    const { error, value } = servicioSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ errors: error.details.map(err => err.message) });
    }

    const servicio = await Servicio.create({
      ...value,
      cliente_id: req.user.id,
    });

    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el servicio' });
    console.error('Error al registrar el servicio:', error);
  }
};

// 🔍 GET /servicios/:id
export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findByPk(id, {
      include: [
        { model: User, as: 'cliente', attributes: ['id', 'name', 'email'] },
        { model: Vehiculo, as: 'vehiculo' },
      ],
    });

    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

// ✏️ PUT /servicios/:id
export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findByPk(id);
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const { error, value } = servicioSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map(err => err.message) });
    }

    await servicio.update(value);

    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

// 🗑️ DELETE /servicios/:id
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findByPk(id);
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await servicio.destroy();

    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};
