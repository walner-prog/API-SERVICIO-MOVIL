"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// middleware/authMiddleware.js
var JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

var authenticateJWT = function authenticateJWT(req, res, next) {
  var authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token no proporcionado'
    });
  }

  var token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({
    error: 'Token no válido'
  });

  try {
    var decoded = _jsonwebtoken["default"].verify(token, JWT_SECRET);

    req.user = decoded; // 👈 Aquí debería incluir { id: ..., username: ... }

    next();
  } catch (err) {
    res.status(401).json({
      error: 'Token inválido o expirado'
    });
  }
};

exports.authenticateJWT = authenticateJWT;