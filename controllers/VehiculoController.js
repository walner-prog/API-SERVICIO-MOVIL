import Vehiculo from "../models/Vehiculo.js";
import User from "../models/User.js";
import Joi from 'joi';
import { Op } from "sequelize";




const registerVehiculoSchema = Joi.object({
  marca: Joi.string().required().messages({
    'string.empty': 'La marca es obligatoria',
  }),
  modelo: Joi.string().required().messages({
    'string.empty': 'El modelo de vehiculo es obligatorio',
  }),
  capacidad: Joi.number().integer().min(1).required().messages({
    'number.base': 'La capacidad debe ser un número entero',
    'number.min': 'La capacidad debe ser al menos 1',
    'number.empty': 'La capacidad es obligatoria',
  }),
  placa: Joi.string().required().messages({
    'string.empty': 'La placa es obligatoria',
    Unique: 'Ya existe un vehículo con esa placa',
  }),

  tipo: Joi.string().valid('moto', 'carro','camion','bus').required().messages({
    'any.only': 'El tipo de vehiculo debe ser moto , carro , camion  o bus',
    'string.empty': 'El tipo de vehiculo es obligatorio',
  }),
});

const updateVehiculoSchema = Joi.object({
  marca: Joi.string().optional().messages({
    'string.empty': 'La marca no puede estar vacía',
  }),
  modelo: Joi.string().optional().messages({
    'string.empty': 'El modelo no puede estar vacío',
  }),
  capacidad: Joi.number().integer().min(1).optional().messages({
    'number.base': 'La capacidad debe ser un número entero',
    'number.min': 'La capacidad debe ser al menos 1',
  }),
  placa: Joi.string().optional().messages({
    'string.empty': 'La placa no puede estar vacía',
    Unique: 'Ya existe un vehículo con esa placa',
  }),
  tipo: Joi.string().valid('moto', 'carro', 'camion', 'bus').optional().messages({
    'any.only': 'El tipo debe ser moto, carro, camion o bus',
    'string.empty': 'El tipo de vehículo no puede estar vacío',
  }),
});



// Obtener todos los vehículos del sistema (admin)
export const index = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      include: {
        model: User,
        attributes: [
          "id",
          "name",
          "username",
          "email",
          "telefono",
          "tipo_usuario",
          "foto_perfil",
        ], // solo los campos necesarios
      },
    });
    res.json(vehiculos);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener los vehículos", detail: err.message });
  }
};

// Obtener los vehículos del usuario autenticado
export const userMe = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      where: { userId: req.user.id },
    });
    res.json(vehiculos);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener tus vehículos", detail: err.message });
  }
};

// Crear un nuevo vehículo
export const store = async (req, res) => {
  try {

    const { error } = registerVehiculoSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });


    const { tipo, marca, modelo, placa, capacidad } = req.body;

    const existente = await Vehiculo.findOne({ where: { placa } });
    if (existente) {
      return res
        .status(400)
        .json({ error: "Ya existe un vehículo con esa placa" });
    }

    const vehiculo = await Vehiculo.create({
      tipo,
      marca,
      modelo,
      placa,
      capacidad,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Vehículo registrado", vehiculo });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al crear vehículo", detail: err.message });
  }
};

// Obtener un solo vehículo por ID
export const show = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id, {  

        include: {
            model: User,
            attributes: [
              "id",
              "name",
              "username",
              "email",
              "telefono",
              "tipo_usuario",
              "foto_perfil",
            ], // solo los campos necesarios
          },
          
     });
    if (!vehiculo)
      return res.status(404).json({ error: "Vehículo no encontrado" });

    res.json(vehiculo);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al obtener vehículo", detail: err.message });
  }
};

// Actualizar un vehículo
export const update = async (req, res) => {
  try {

    const vehiculo = await Vehiculo.findByPk(req.params.id);

    const { error } = updateVehiculoSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });
  

    const { tipo, marca, modelo, placa, capacidad } = req.body;

    const existente = await Vehiculo.findOne({ 
      where: { 
        placa, 
        id: { [Op.ne]: req.params.id } // Ignorar el vehículo actual
      } 
    });
    if (existente) {
      return res
        .status(400)
        .json({ error: "Ya existe un vehículo con esa placa" });
    }


    await vehiculo.update({
      tipo: tipo || vehiculo.tipo,
      marca: marca || vehiculo.marca,
      modelo: modelo || vehiculo.modelo,
      placa: placa || vehiculo.placa,
      capacidad: capacidad || vehiculo.capacidad,

    });

    res.json({ message: "Vehículo actualizado", vehiculo });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al actualizar vehículo", detail: err.message });
  }
};

// Eliminar un vehículo
export const destroy = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);

    if (!vehiculo)
      return res.status(404).json({ error: "Vehículo no encontrado" });
    if (vehiculo.userId !== req.user.id)
      return res.status(403).json({ error: "No autorizado" });

    await vehiculo.destroy();

    res.json({ message: "Vehículo eliminado" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al eliminar vehículo", detail: err.message });
  }
};
