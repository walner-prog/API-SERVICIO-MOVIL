# API Backend Node.js Express-MySQL-Sequelize-JWT

API REST construida con **Node.js**, **Express**, **MySQL** y **Sequelize**, utilizando **JWT** para autenticación. Diseñada para una aplicación de servicios de transporte.

---

## 🚀 Características

- Autenticación de usuarios con JWT
- Gestión de servicios y usuarios
- Validación de datos con Joi
- Carga de archivos (imágenes, documentos, etc.) con Multer
- Envío de correos con Nodemailer
- Estructura modular con Sequelize (ORM)
- Variables de entorno con dotenv
- Arquitectura limpia y mantenible

---


---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (jsonwebtoken)
- Joi (validación)
- Multer (subida de archivos)
- Nodemailer (correo electrónico)
- bcrypt y bcryptjs (hash de contraseñas)
- dotenv (variables de entorno)
- uuid (identificadores únicos)

---

## 🔐 Variables de entorno `.env`

Ejemplo de archivo `.env`:

```env
PORT=8000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tu_basededatos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
JWT_SECRET=supersecretkey
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña

```

 ## 📄 Licencia
Este proyecto está bajo la licencia MIT.