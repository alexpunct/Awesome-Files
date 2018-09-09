import { ADD_FILE, ADD_FILES, ADD_FILES_META, DELETE_FILE } from './FileActions';

// Initial State
const initialState = { data: [], metaData: {} };

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      return {
        data: [action.file, ...state.data],
        metaData: state.metaData,
      };

    case ADD_FILES:
      return {
        data: action.files,
        metaData: state.metaData,
      };

    case ADD_FILES_META:
      return {
        metaData: action.filesMeta,
        data: state.data,
      };

    case DELETE_FILE:
      return {
        data: state.data.filter(file => file.cuid !== action.cuid),
        metaData: state.metaData,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all files
export const getFiles = state => state.files.data;

// Get all files meta data
export const getFilesMeta = state => state.files.metaData;

// Get file by cuid
export const getFile = (state, cuid) => state.files.data.filter(file => file.cuid === cuid)[0];

// Export Reducer
export default FileReducer;
