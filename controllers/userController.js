import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';



const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';


const updateSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.empty': 'El nombre no puede estar vacío',
  }),
  username: Joi.string().optional().messages({
    'string.empty': 'El nombre de usuario no puede estar vacío',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Debes ingresar un correo electrónico válido',
  }),
  password: Joi.string().min(6).optional().allow('', null).messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
  }),
  foto_perfil: Joi.string().optional().allow(null, ''),
  cedula: Joi.string().optional().allow(null, ''),
  telefono: Joi.string().optional().allow(null, ''),
  latitud: Joi.string().optional().allow(null, ''),
  longitud: Joi.string().optional().allow(null, ''),
  tipo_usuario: Joi.string().valid('Cliente', 'Conductor').optional().messages({
    'any.only': 'El tipo de usuario debe ser Cliente o Conductor',
  }),
});


// GET /miperfil
export const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el perfil', detail: err.message });
  }
};

// PUT /me
export const actualizarPerfil = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Validar datos
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(422).json({ error: error.details[0].message });

    let {
      name, username, email, password,
      foto_perfil, cedula, telefono,
      latitud, longitud, tipo_usuario
    } = req.body;

    // Si viene nueva contraseña, encriptarla
    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    await user.update({
      
      name: name || user.name,
      username: username || user.username,
      email: email || user.email,
      telefono: telefono || user.telefono,
      latitud: latitud || user.latitud,
      longitud: longitud || user.longitud,
      tipo_usuario,
      foto_perfil: foto_perfil || user.foto_perfil,
      cedula: cedula || user.cedula,
      password: password || user.password, // si viene, actualiza
    });

    res.json({ message: 'Perfil actualizado correctamente', user });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar perfil', detail: err.message });
  }
};

// DELETE /me
export const eliminarCuenta = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.update({ deleted_at: new Date() });

    res.json({ message: 'Cuenta desactivada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al desactivar cuenta', detail: err.message });
  }
};

// POST /reactivar
export const reactivarCuenta = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
      paranoid: false, // para incluir usuarios soft-deleted
    });

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    if (!user.deleted_at) {
      return res.status(400).json({ error: 'La cuenta ya está activa' });
    }

    await user.restore();

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Cuenta reactivada exitosamente', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al reactivar cuenta', detail: err.message });
  }
};
