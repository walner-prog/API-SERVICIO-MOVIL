"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = sendEmail;
exports.transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // 👈 NECESARIO para que process.env funcione


var transporter = _nodemailer["default"].createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: false,
  // true si usas el puerto 465
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

exports.transporter = transporter;

function sendEmail(to, subject, html) {
  return transporter.sendMail({
    from: "\"".concat(process.env.MAIL_FROM_NAME, "\" <").concat(process.env.MAIL_FROM_ADDRESS, ">"),
    to: to,
    subject: subject,
    html: html
  });
}