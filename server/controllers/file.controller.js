import File from '../models/file';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs';

/**
 * Get all files
 * @param req
 * @param res
 * @returns void
 */
export function getFiles(req, res) {
  File.find().sort('-dateAdded').exec((err, files) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ files });
  });
}

/**
 * Save a file
 * @param req
 * @param res
 * @returns void
 */
export function addFile(req, res) {
  // the file should be set on the request by the router middleware
  if (req.file && req.file.originalname) {
    const newFile = new File(req.file);

    // Let's sanitize inputs
    newFile.filename = sanitizeHtml(newFile.filename);

    newFile.cuid = cuid();
    newFile.save((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ file: newFile });
    });
  } else {
    res.status(403).end();
  }
}

/**
 * Get a single file
 * @param req
 * @param res
 * @returns void
 */
export function getFile(req, res) {
  File.findOne({ cuid: req.params.cuid }).exec((err, file) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ file });
  });
}

/**
 * Delete a file
 * @param req
 * @param res
 * @returns void
 */
export function deleteFile(req, res) {
  File.findOne({ cuid: req.params.cuid }).exec((err, file) => {
    if (err) {
      res.status(500).send(err);
    }

    file.remove(() => {
      fs.unlink(file.path, error => {
        if (error) {
          // do nothing, it means the file doesn't exist
        }
        res.status(200).end();
      });
    });
  });
}
