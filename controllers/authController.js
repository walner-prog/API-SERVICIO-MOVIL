import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/index.js";
import { sendEmail } from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "El nombre es obligatorio",
  }),
  username: Joi.string().min(5).required().messages({
    "string.empty": "El nombre de usuario es obligatorio",
    "string.pattern.name": "El nombre de usuario debe tener un formato válido",
    "string.min": "El nombre de usuario debe tener al menos 5 caracteres",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Debes ingresar un correo electrónico válido",
    "string.empty": "El correo electrónico es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.empty": "La contraseña es obligatoria",
  }),

  foto_perfil: Joi.string().optional().allow(null, ""),
  cedula: Joi.string().optional().allow(null, "").messages({
    "string.empty": "La cédula no puede estar vacía",
    "string.base": "La cédula debe ser un string",
    "string.pattern.name": "La cédula debe tener un formato válido",
  }),
  telefono: Joi.string().optional().allow(null, ""),
  latitud: Joi.string().optional().allow(null, ""),
  longitud: Joi.string().optional().allow(null, ""),
  tipo_usuario: Joi.string().valid("Cliente", "Conductor").required().messages({
    "any.only": "El tipo de usuario debe ser Cliente o Conductor",
    "string.empty": "El tipo de usuario es obligatorio",
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
  }),
});

const verifySchema = Joi.object({
  token: Joi.string().required(),
});

const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetSchema = Joi.object({
  recovery_code: Joi.string().required(),
  new_value: Joi.string().required(),
  type: Joi.string().valid("password", "username").required(),
  password_confirmation: Joi.any()
    .valid(Joi.ref("new_value"))
    .when("type", { is: "password", then: Joi.required() }),
});

// Registro de usuario
export const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });

  const {
    name,
    username,
    email,
    telefono,
    tipo_usuario,
    foto_perfil,
    cedula,
    latitud,
    longitud,
    password,
  } = req.body;

  try {
    const [userExists, userCedulaExists, usernameExists] = await Promise.all([
      User.findOne({ where: { email } }),
      User.findOne({ where: { cedula } }),
      User.findOne({ where: { username } }),
    ]);

    if (userExists) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    if (userCedulaExists) {
      return res.status(400).json({ error: "La cédula ya está registrada" });
    }

    if (usernameExists) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const user = await User.create({
      name,
      username,
      email,
      telefono,
      tipo_usuario,
      foto_perfil,
      cedula,
      latitud,
      longitud,
      password: hashedPassword,
      verification_token: verificationToken,
      email_verified_at: null,
    });

    // Aquí puedes enviar el correo electrónico con el link de verificación
    await sendEmail(
      req.body.email,
      "Verifica tu cuenta",
      `Token: ${verificationToken}`
    );

    res
      .status(201)
      .json({
        message: "Registro exitoso. Revisa tu correo para verificar la cuenta",
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error al registrar usuario", detail: err.message });
    console.error("Error al registrar usuario:", err);
  }
};

// Verificar email
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) return res.status(404).json({ error: "Token no válido" });

    user.email_verified_at = true;
    user.verification_token = null;
    await user.save();

    res.json({ message: "Cuenta verificada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al verificar cuenta" });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "El nombre de usuario no está registrado" });
    }

    if (!user.email_verified_at) {
      return res
        .status(401)
        .json({ error: "La cuenta no ha sido verificada. Revisa tu correo." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Error del servidor al iniciar sesión",
        detail: err.message,
      });
  }
};

// Cerrar sesión (opcional si usas frontend para manejar token)
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // true si usás HTTPS
    sameSite: "Strict",
  });

  res.json({ message: "Sesión cerrada exitosamente" });
};

// Solicitar recuperación
export const forgotCredentials = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const resetToken = crypto.randomUUID();
    user.resetToken = resetToken;
    await user.save();

    // Enviar correo con enlace de recuperación
    // `${FRONTEND_URL}/reset-account/${resetToken}`

    res.json({ message: "Revisa tu correo para recuperar tu cuenta" });
  } catch (err) {
    res.status(500).json({ error: "Error al generar recuperación" });
  }
};

// Restablecer cuenta
export const resetAccount = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user)
      return res.status(404).json({ error: "Token inválido o expirado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al restablecer cuenta" });
  }
};

/*

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'El correo no está registrado' });
    }

    if (!user.email_verified_at) {
      return res.status(401).json({ error: 'La cuenta no ha sido verificada. Revisa tu correo.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor al iniciar sesión', detail: err.message });
  }
};

*/
