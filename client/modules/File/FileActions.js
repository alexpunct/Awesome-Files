import FileSaver from 'file-saver';
import callApi, { callApiBlob } from '../../util/apiCaller';

// Export Constants
export const ADD_FILE = 'ADD_FILE';
export const ADD_FILES = 'ADD_FILES';
export const DELETE_FILE = 'DELETE_FILE';

// Export Actions
export function addFile(file) {
  return {
    type: ADD_FILE,
    file,
  };
}

export function addFileRequest(file) {
  return (dispatch) => {
    return callApi('files', 'post', {
      file: {
        ...file,
      },
      originalFile: file,
    }).then((res) => { if (res.file) { dispatch(addFile(res.file)); } });
  };
}

export function addFiles(files) {
  return {
    type: ADD_FILES,
    files,
  };
}

export function fetchFiles() {
  return (dispatch) => {
    return callApi('files').then(res => {
      dispatch(addFiles(res.files));
    });
  };
}

export function fetchFile(cuid) {
  return (dispatch) => {
    return callApi(`files/${cuid}`).then(res => dispatch(addFile(res.file)));
  };
}

export function deleteFile(cuid) {
  return {
    type: DELETE_FILE,
    cuid,
  };
}

export function deleteFileRequest(cuid) {
  return (dispatch) => {
    return callApi(`files/${cuid}`, 'delete').then(() => dispatch(deleteFile(cuid)));
  };
}

export function downloadFileRequest(cuid, fileName) {
  return () => {
    return callApiBlob(`download/${cuid}`).then((fileBlob) => { FileSaver.saveAs(fileBlob, fileName); });
  };
}
