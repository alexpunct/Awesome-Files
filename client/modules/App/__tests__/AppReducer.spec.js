import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowUploadFileForm } from '../AppReducer';
import { toggleUploadFileForm } from '../AppActions';

test('action for TOGGLE_UPLOAD_FILE_FORM is working', reducerTest(
  appReducer,
  { showUploadFileForm: false },
  toggleUploadFileForm(),
  { showUploadFileForm: true },
));

test('getShowUploadFileForm selector', t => {
  t.is(getShowUploadFileForm({
    app: { showUploadFileForm: false },
  }), false);
});
