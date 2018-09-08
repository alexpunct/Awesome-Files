import { ADD_FILE, ADD_FILES, DELETE_FILE } from './FileActions';

// Initial State
const initialState = { data: [] };

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      return {
        data: [action.file, ...state.data],
      };

    case ADD_FILES:
      return {
        data: action.files,
      };

    case DELETE_FILE:
      return {
        data: state.data.filter(file => file.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all files
export const getFiles = state => state.files.data;

// Get file by cuid
export const getFile = (state, cuid) => state.files.data.filter(file => file.cuid === cuid)[0];

// Export Reducer
export default FileReducer;
