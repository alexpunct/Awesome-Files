import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_UPLOAD_FILE_FORM, toggleUploadFileForm } from '../AppActions';

test('should return the correct type for toggleUploadFileForm', actionTest(toggleUploadFileForm, null, { type: TOGGLE_UPLOAD_FILE_FORM }));
