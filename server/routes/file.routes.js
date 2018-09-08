import { Router } from 'express';
import * as FileController from '../controllers/file.controller';
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = new Router();

// Get all files
router.route('/files').get(FileController.getFiles);

// Get one file by cuid
router.route('/files/:cuid').get(FileController.getFile);

// Add a new File
router.use(upload.single('file')).route('/files').post(FileController.addFile);

// Delete a File by cuid
router.route('/files/:cuid').delete(FileController.deleteFile);

export default router;
