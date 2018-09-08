import { Router } from 'express';
import * as FileController from '../controllers/file.controller';
import fs from 'fs';
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename(req, file, cb) {
    let saveName = file.originalname;
    if (fs.existsSync(`./uploads/${file.originalname}`)) {
      saveName = `${Date.now()}_${saveName}`;
    }
    cb(null, saveName);
  },
});
const upload = multer({ storage });

const router = new Router();

// Get all files
router.route('/files').get(FileController.getFiles);

// Get one file by cuid
router.route('/files/:cuid').get(FileController.getFile);
router.route('/download/:cuid').get(FileController.downloadFile);

// Delete a File by cuid
router.route('/files/:cuid').delete(FileController.deleteFile);

// Add a new File
router.use(upload.single('file')).route('/files').post(FileController.addFile);

export default router;
