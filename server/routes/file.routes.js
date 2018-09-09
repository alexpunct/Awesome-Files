import { Router } from 'express';
import * as FileController from '../controllers/file.controller';
import fs from 'fs';
import multer from 'multer';

// Storing the files in the uploads root folder
const storage = multer.diskStorage({
  destination: './uploads/',
  filename(req, file, cb) { // get the file name
    let saveName = file.originalname;
    // in case we have a file with the same name already, add the current timestamp in front of it
    if (fs.existsSync(`./uploads/${file.originalname}`)) {
      saveName = `${Date.now()}_${saveName}`;
    }
    cb(null, saveName);
  },
});
const upload = multer({ storage });

const router = new Router();
// simple authentication to not allow access to the api from the browser. Should be replaced with proper auth
router.use((req, res, next) => {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401);
  }
  return next();
});

// GET all Files
router.route('/files').get(FileController.getFiles);

// GET one File by cuid
router.route('/files/:cuid').get(FileController.getFile);

// GET one individual File as binary
router.route('/download/:cuid').get(FileController.downloadFile);

// DELETE a File by cuid
router.route('/files/:cuid').delete(FileController.deleteFile);

// GET All Files meta data
router.route('/filesMeta').get(FileController.getFilesMeta);

// POST a new File
router.use(upload.single('file')).route('/files').post(FileController.addFile);

export default router;
