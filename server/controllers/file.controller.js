import File from '../models/file';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs';
import aqp from 'api-query-params';
import _ from 'lodash';

/**
 * Get files meta-data
 * @param req
 * @param res
 * @returns void
 */
export function getFilesMeta(req, res) {
  // Look in all files
  File
    .find()
    .exec((err, files) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      // export a JSON object with the meta data. Include the CSRF token
      const metaData = {
        allExtensions: _.uniq(files.map(file => file.extension)),
        csrfToken: req.csrfToken(),
      };
      res.json(metaData);
    });
}

/**
 * Get all files
 * @param req
 * @param res
 * @returns void
 */
export function getFiles(req, res) {
  const { filter, skip, limit, sort } = aqp(req.query);
  File
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .exec((err, files) => {
      if (err) {
        res.status(500).send(err);
        return;
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
  // the file should be set on the request by the router middleware >> see file.routes.js
  if (req.file && req.file.originalname) {
    const newFile = new File(req.file);

    // Let's sanitize inputs
    newFile.filename = sanitizeHtml(newFile.filename);
    // Take the file extension from the file name
    newFile.extension = newFile.filename.split('.').pop();
    // Generate a unique id
    newFile.cuid = cuid();

    // Save the file and send it back in the response
    newFile.save((err) => {
      if (err) {
        res.status(500).send(err);
        return;
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
      return;
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
      return;
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

/**
 * Download a single file
 * @param req
 * @param res
 * @returns void
 */
export function downloadFile(req, res) {
  File.findOne({ cuid: req.params.cuid }).exec((err, file) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!file.path) {
      res.status(404).send();
      return;
    }

    // Read the finle binary and send it in the response
    fs.readFile(file.path, (error, data) => {
      if (err) {
        res.status(404).send(error);
        return;
      }
      res.send(data);
    });
  });
}
