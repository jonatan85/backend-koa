import multer from '@koa/multer';

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
