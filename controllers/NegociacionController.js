import Negociacion from "../models/negociacion.js";
import User from "../models/User.js";
import Joi from "joi";
import { Op } from "sequelize";

// Esquema para crear una negociación
const registerNegociacionSchema = Joi.object({
  servicio_id: Joi.number().integer().required().messages({
    'any.required': 'El ID del servicio es obligatorio',
    'number.base': 'El ID del servicio debe ser un número entero',
  }),
  monto_ofrecido: Joi.number().min(0).required().messages({
    'any.required': 'El monto ofrecido es obligatorio',
    'number.base': 'El monto ofrecido debe ser un número',
  }),
  comentario: Joi.string().allow('').optional().messages({
    'string.base': 'El comentario debe ser un texto',
  }),
});

// Esquema para actualizar una negociación
const updateNegociacionSchema = Joi.object({
  monto_ofrecido: Joi.number().min(0).optional().messages({
    'number.base': 'El monto ofrecido debe ser un número',
  }),
  comentario: Joi.string().allow('').optional().messages({
    'string.base': 'El comentario debe ser un texto',
  }),
});

// Obtener todas las negociaciones (admin)
export const index = async (req, res) => {
  try {
    const negociaciones = await Negociacion.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'username', 'email', 'tipo_usuario'],
      },
    });
    res.json(negociaciones);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener negociaciones", detail: err.message });
  }
};

// Obtener negociaciones del usuario autenticado
export const userMe = async (req, res) => {
  try {
    const negociaciones = await Negociacion.findAll({
      where: { usuario_id: req.user.id },
    });
    res.json(negociaciones);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus negociaciones", detail: err.message });
  }
};

// Crear una nueva negociación
export const store = async (req, res) => {
  try {
    const { error } = registerNegociacionSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });

    const { servicio_id, monto_ofrecido, comentario } = req.body;

    const negociacion = await Negociacion.create({
      servicio_id,
      usuario_id: req.user.id,
      monto_ofrecido,
      comentario,
    });

    res.status(201).json({ message: "Negociación creada", negociacion });
  } catch (err) {
    res.status(500).json({ error: "Error al crear negociación", detail: err.message });
  }
};

// Obtener una sola negociación
export const show = async (req, res) => {
  try {
    const negociacion = await Negociacion.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'username', 'email', 'tipo_usuario'],
      },
    });

    if (!negociacion)
      return res.status(404).json({ error: "Negociación no encontrada" });

    res.json(negociacion);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener negociación", detail: err.message });
  }
};

// Actualizar una negociación
export const update = async (req, res) => {
  try {
    const negociacion = await Negociacion.findByPk(req.params.id);

    if (!negociacion)
      return res.status(404).json({ error: "Negociación no encontrada" });

    if (negociacion.usuario_id !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    const { error } = updateNegociacionSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });

    const { monto_ofrecido, comentario } = req.body;

    await negociacion.update({
      monto_ofrecido: monto_ofrecido ?? negociacion.monto_ofrecido,
      comentario: comentario ?? negociacion.comentario,
    });

    res.json({ message: "Negociación actualizada", negociacion });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar negociación", detail: err.message });
  }
};

// Eliminar una negociación
export const destroy = async (req, res) => {
  try {
    const negociacion = await Negociacion.findByPk(req.params.id);

    if (!negociacion)
      return res.status(404).json({ error: "Negociación no encontrada" });

    if (negociacion.usuario_id !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    await negociacion.destroy();
    res.json({ message: "Negociación eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar negociación", detail: err.message });
  }
};
