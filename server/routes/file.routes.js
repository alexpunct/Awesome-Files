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

router.use((req, res, next) => {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401);
  }
  return next();
});

// Get all files
router.route('/files').get(FileController.getFiles);

// Get one file by cuid
router.route('/files/:cuid').get(FileController.getFile);

// Downlaod individual file
router.route('/download/:cuid').get(FileController.downloadFile);

// Delete a File by cuid
router.route('/files/:cuid').delete(FileController.deleteFile);

// Get all files meta data
router.route('/filesMeta').get(FileController.getFilesMeta);

// Add a new File
router.use(upload.single('file')).route('/files').post(FileController.addFile);

export default router;
