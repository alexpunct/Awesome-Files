import FileSaver from 'file-saver';
import querystring from 'query-string';

// Import helpers
import callApi, { callApiBlob } from '../../util/apiCaller';

// Export Constants
export const ADD_FILE = 'ADD_FILE';
export const ADD_FILES = 'ADD_FILES';
export const ADD_FILES_META = 'ADD_FILES_META';
export const DELETE_FILE = 'DELETE_FILE';

// Export Actions
export function addFile(file) { // Add a file to the store
  return {
    type: ADD_FILE,
    file,
  };
}

export function addFileRequest(file) { // Post a file to the API [not used]
  return (dispatch) => {
    return callApi('files', 'post', {
      file: {
        ...file,
      },
      originalFile: file,
    }).then((res) => { if (res.file) { dispatch(addFile(res.file)); } });
  };
}

export function addFiles(files) { // Add multiple files to the store
  return {
    type: ADD_FILES,
    files,
  };
}

export function addFilesMeta(filesMeta) { // Add the files meta-data to the store
  return {
    type: ADD_FILES_META,
    filesMeta,
  };
}

export function fetchFiles(query = {}) { // Fetch the files from the API
  let apiEndpoint = 'files';
  if (Object.keys(query).length > 0) {
    apiEndpoint += `?${querystring.stringify(query)}`;
  }
  return (dispatch) => {
    return callApi(apiEndpoint).then(res => {
      dispatch(addFiles(res.files));
    });
  };
}

export function fetchFilesMeta() { // Fetch files meta-data from the API
  return (dispatch) => {
    return callApi('filesMeta').then(res => {
      dispatch(addFilesMeta(res));
    });
  };
}

export function fetchFile(cuid) { // Fetch one file from the API [not used]
  return (dispatch) => {
    return callApi(`files/${cuid}`).then(res => dispatch(addFile(res.file)));
  };
}

export function deleteFile(cuid) { // Delete file from the store
  return {
    type: DELETE_FILE,
    cuid,
  };
}

export function deleteFileRequest(cuid) { // DELETE request to the API
  return (dispatch) => {
    return callApi(`files/${cuid}`, 'delete').then(() => dispatch(deleteFile(cuid)));
  };
}

export function downloadFileRequest(cuid, fileName) { // Request the download of a file (binary)
  return () => {
    return callApiBlob(`download/${cuid}`).then((fileBlob) => { FileSaver.saveAs(fileBlob, fileName); });
  };
}
