"use strict";

var _db = _interopRequireDefault(require("./config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categorias = [// Aquí agregas el resto de los alimentos
]; // Función para insertar los datos

function insertCategorias() {
  categorias.forEach(function (categoria) {
    var query = "\n      INSERT INTO categorias \n   (\n          nombre, \n          descripcion, \n       \n        ) VALUES (?, ?, )\n      ";
    var values = [categoria.nombre, categoria.descripcion];

    _db["default"].query(query, values, function (err, results) {
      if (err) {
        console.error('Error al insertar:', err);
        return;
      }

      console.log('Dato insertado con éxito:', results);
    });
  });
} // Llamar a la función para insertar los datos


insertCategorias();