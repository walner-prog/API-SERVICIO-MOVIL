import axios from 'axios'
import FormData from 'form-data'

export const uploadImage = async (req, res) => {
  if (!req.file) {
    console.log('No se envió ningún archivo')
    return res.status(400).json({ message: 'No se envió ningún archivo' })
  }

  try {
    console.log('Archivo recibido:', req.file)

    const formData = new FormData()
    const base64Image = req.file.buffer.toString('base64')

    console.log('Imagen codificada en base64 (primeros 100 caracteres):', base64Image.slice(0, 100))

    formData.append('key', process.env.IMGBB_API_KEY)
    formData.append('image', base64Image)

    console.log('Enviando imagen a imgbb...')

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: formData.getHeaders()
    })

    console.log('Respuesta de imgbb:', response.data)

    const imageUrl = response.data.data.url

    res.status(200).json({ url: imageUrl })
  } catch (err) {
    console.error('Error al subir imagen a imgbb:', err)
    res.status(500).json({ message: 'Error al subir imagen', error: err.message })
  }
}
