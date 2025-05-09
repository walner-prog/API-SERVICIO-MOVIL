"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetAccount = exports.forgotCredentials = exports.logout = exports.login = exports.verifyEmail = exports.register = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

var _index = require("../models/index.js");

var _mailer = require("../utils/mailer.js");

var _uuid = require("uuid");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

var registerSchema = _joi["default"].object({
  name: _joi["default"].string().required().messages({
    "string.empty": "El nombre es obligatorio"
  }),
  username: _joi["default"].string().min(5).required().messages({
    "string.empty": "El nombre de usuario es obligatorio",
    "string.pattern.name": "El nombre de usuario debe tener un formato válido",
    "string.min": "El nombre de usuario debe tener al menos 5 caracteres"
  }),
  email: _joi["default"].string().email().required().messages({
    "string.email": "Debes ingresar un correo electrónico válido",
    "string.empty": "El correo electrónico es obligatorio"
  }),
  password: _joi["default"].string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.empty": "La contraseña es obligatoria"
  }),
  foto_perfil: _joi["default"].string().optional().allow(null, ""),
  cedula: _joi["default"].string().optional().allow(null, "").messages({
    "string.empty": "La cédula no puede estar vacía",
    "string.base": "La cédula debe ser un string",
    "string.pattern.name": "La cédula debe tener un formato válido"
  }),
  telefono: _joi["default"].string().optional().allow(null, ""),
  latitud: _joi["default"].string().optional().allow(null, ""),
  longitud: _joi["default"].string().optional().allow(null, ""),
  tipo_usuario: _joi["default"].string().valid("Cliente", "Conductor").required().messages({
    "any.only": "El tipo de usuario debe ser Cliente o Conductor",
    "string.empty": "El tipo de usuario es obligatorio"
  })
});

var loginSchema = _joi["default"].object({
  username: _joi["default"].string().required().messages({
    "string.empty": "El nombre de usuario es obligatorio"
  }),
  password: _joi["default"].string().min(6).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres"
  })
});

var verifySchema = _joi["default"].object({
  token: _joi["default"].string().required()
});

var forgotSchema = _joi["default"].object({
  email: _joi["default"].string().email().required()
});

var resetSchema = _joi["default"].object({
  recovery_code: _joi["default"].string().required(),
  new_value: _joi["default"].string().required(),
  type: _joi["default"].string().valid("password", "username").required(),
  password_confirmation: _joi["default"].any().valid(_joi["default"].ref("new_value")).when("type", {
    is: "password",
    then: _joi["default"].required()
  })
}); // Registro de usuario


var register = function register(req, res) {
  var _registerSchema$valid, error, _req$body, name, username, email, telefono, tipo_usuario, foto_perfil, cedula, latitud, longitud, password, _ref, _ref2, userExists, userCedulaExists, usernameExists, hashedPassword, verificationToken, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _registerSchema$valid = registerSchema.validate(req.body), error = _registerSchema$valid.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(422).json({
            error: error.details[0].message
          }));

        case 3:
          _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, telefono = _req$body.telefono, tipo_usuario = _req$body.tipo_usuario, foto_perfil = _req$body.foto_perfil, cedula = _req$body.cedula, latitud = _req$body.latitud, longitud = _req$body.longitud, password = _req$body.password;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(Promise.all([_index.User.findOne({
            where: {
              email: email
            }
          }), _index.User.findOne({
            where: {
              cedula: cedula
            }
          }), _index.User.findOne({
            where: {
              username: username
            }
          })]));

        case 7:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 3);
          userExists = _ref2[0];
          userCedulaExists = _ref2[1];
          usernameExists = _ref2[2];

          if (!userExists) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "El usuario ya está registrado"
          }));

        case 14:
          if (!userCedulaExists) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "La cédula ya está registrada"
          }));

        case 16:
          if (!usernameExists) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "El nombre de usuario ya está registrado"
          }));

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 20:
          hashedPassword = _context.sent;
          verificationToken = (0, _uuid.v4)();
          _context.next = 24;
          return regeneratorRuntime.awrap(_index.User.create({
            name: name,
            username: username,
            email: email,
            telefono: telefono,
            tipo_usuario: tipo_usuario,
            foto_perfil: foto_perfil,
            cedula: cedula,
            latitud: latitud,
            longitud: longitud,
            password: hashedPassword,
            verification_token: verificationToken,
            email_verified_at: null
          }));

        case 24:
          user = _context.sent;
          _context.next = 27;
          return regeneratorRuntime.awrap((0, _mailer.sendEmail)(req.body.email, "Verifica tu cuenta", "Token: ".concat(verificationToken)));

        case 27:
          res.status(201).json({
            message: "Registro exitoso. Revisa tu correo para verificar la cuenta"
          });
          _context.next = 34;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](4);
          res.status(500).json({
            error: "Error al registrar usuario",
            detail: _context.t0.message
          });
          console.error("Error al registrar usuario:", _context.t0);

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 30]]);
}; // Verificar email


exports.register = register;

var verifyEmail = function verifyEmail(req, res) {
  var token, user;
  return regeneratorRuntime.async(function verifyEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.params.token;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_index.User.findOne({
            where: {
              verificationToken: token
            }
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            error: "Token no válido"
          }));

        case 7:
          user.email_verified_at = true;
          user.verification_token = null;
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          res.json({
            message: "Cuenta verificada correctamente"
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: "Error al verificar cuenta"
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
}; // Iniciar sesión


exports.verifyEmail = verifyEmail;

var login = function login(req, res) {
  var _loginSchema$validate, error, _req$body2, username, password, user, passwordMatch, token;

  return regeneratorRuntime.async(function login$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _loginSchema$validate = loginSchema.validate(req.body), error = _loginSchema$validate.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(422).json({
            error: error.details[0].message
          }));

        case 3:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_index.User.findOne({
            where: {
              username: username
            }
          }));

        case 7:
          user = _context3.sent;

          if (user) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            error: "El nombre de usuario no está registrado"
          }));

        case 10:
          if (user.email_verified_at) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            error: "La cuenta no ha sido verificada. Revisa tu correo."
          }));

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 14:
          passwordMatch = _context3.sent;

          if (passwordMatch) {
            _context3.next = 17;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            error: "Contraseña incorrecta"
          }));

        case 17:
          token = _jsonwebtoken["default"].sign({
            id: user.id,
            username: user.username
          }, JWT_SECRET, {
            expiresIn: "1d"
          });
          res.json({
            message: "Inicio de sesión exitoso",
            token: token
          });
          _context3.next = 24;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](4);
          res.status(500).json({
            error: "Error del servidor al iniciar sesión",
            detail: _context3.t0.message
          });

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 21]]);
}; // Cerrar sesión (opcional si usas frontend para manejar token)


exports.login = login;

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            // true si usás HTTPS
            sameSite: "Strict"
          });
          res.json({
            message: "Sesión cerrada exitosamente"
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Solicitar recuperación


exports.logout = logout;

var forgotCredentials = function forgotCredentials(req, res) {
  var email, user, resetToken;
  return regeneratorRuntime.async(function forgotCredentials$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_index.User.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "Usuario no encontrado"
          }));

        case 7:
          resetToken = _crypto["default"].randomUUID();
          user.resetToken = resetToken;
          _context5.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          // Enviar correo con enlace de recuperación
          // `${FRONTEND_URL}/reset-account/${resetToken}`
          res.json({
            message: "Revisa tu correo para recuperar tu cuenta"
          });
          _context5.next = 17;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: "Error al generar recuperación"
          });

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 14]]);
}; // Restablecer cuenta


exports.forgotCredentials = forgotCredentials;

var resetAccount = function resetAccount(req, res) {
  var _req$body3, token, password, user, hashedPassword;

  return regeneratorRuntime.async(function resetAccount$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, token = _req$body3.token, password = _req$body3.password;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_index.User.findOne({
            where: {
              resetToken: token
            }
          }));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: "Token inválido o expirado"
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 9:
          hashedPassword = _context6.sent;
          user.password = hashedPassword;
          user.resetToken = null;
          _context6.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.json({
            message: "Contraseña actualizada correctamente"
          });
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](1);
          res.status(500).json({
            error: "Error al restablecer cuenta"
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 17]]);
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


exports.resetAccount = resetAccount;