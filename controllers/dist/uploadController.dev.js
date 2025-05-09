"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadImage = function uploadImage(req, res) {
  var formData, base64Image, response, imageUrl;
  return regeneratorRuntime.async(function uploadImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 3;
            break;
          }

          console.log('No se envió ningún archivo');
          return _context.abrupt("return", res.status(400).json({
            message: 'No se envió ningún archivo'
          }));

        case 3:
          _context.prev = 3;
          console.log('Archivo recibido:', req.file);
          formData = new _formData["default"]();
          base64Image = req.file.buffer.toString('base64');
          console.log('Imagen codificada en base64 (primeros 100 caracteres):', base64Image.slice(0, 100));
          formData.append('key', process.env.IMGBB_API_KEY);
          formData.append('image', base64Image);
          console.log('Enviando imagen a imgbb...');
          _context.next = 13;
          return regeneratorRuntime.awrap(_axios["default"].post('https://api.imgbb.com/1/upload', formData, {
            headers: formData.getHeaders()
          }));

        case 13:
          response = _context.sent;
          console.log('Respuesta de imgbb:', response.data);
          imageUrl = response.data.data.url;
          res.status(200).json({
            url: imageUrl
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](3);
          console.error('Error al subir imagen a imgbb:', _context.t0);
          res.status(500).json({
            message: 'Error al subir imagen',
            error: _context.t0.message
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 19]]);
};

exports.uploadImage = uploadImage;