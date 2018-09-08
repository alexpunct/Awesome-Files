// Import Actions
import { TOGGLE_UPLOAD_FILE_FORM } from './AppActions';

// Initial State
const initialState = {
  showUploadFileForm: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_UPLOAD_FILE_FORM:
      return {
        showUploadFileForm: !state.showUploadFileForm,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get getShowUploadFileForm
export const getShowUploadFileForm = state => state.app.showUploadFileForm;

// Export Reducer
export default AppReducer;
