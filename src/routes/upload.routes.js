import Router from '@koa/router';
import cloudinary from '../config/cloudinary.js';
import upload from '../config/multer.js';

const router = new Router({ prefix: '/upload' });

router.post('/image', upload.single('image'), async (ctx) => {
  try {
    const file = ctx.file;

    if (!file) {
      ctx.status = 400;
      ctx.body = { message: 'No se ha subido ninguna imagen' };
      return;
    }

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        ctx.status = 500;
        ctx.body = { message: 'Error al subir la imagen', error };
        return;
      }
      ctx.body = { message: 'Imagen subida con éxito', url: result.secure_url };
    }).end(file.buffer);

  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error en la subida', error: error.message };
  }
});

export default router;
