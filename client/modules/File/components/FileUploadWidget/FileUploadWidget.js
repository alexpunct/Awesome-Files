import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import DropzoneComponent from 'react-dropzone-component';

// Import Selectors
import { getFilesMeta } from '../../FileReducer';

// Import variables
import { API_URL, AUTH_TOKEN } from '../../../../util/apiCaller';

// Import Style
import styles from './FileUploadWidget.css';

export class FileCreateWidget extends Component {
  render() {
    // show/hide the upload form based on the showAddFile prop coming from the store
    const cls = `${styles.form} ${(this.props.showAddFile ? styles.appear : '')}`;

    // dropzone setup - https://github.com/felixrieseberg/React-Dropzone-Component
    const dropzoneConfig = {
      postUrl: `${API_URL}/files`,
      dictRemoveFile: 'Delete',
      dictCancelUploadConfirmation: 'Are you sure to cancel upload?',
    };

    // dropzone config options
    const djsConfig = {
      addRemoveLinks: false,
      headers: { 'x-auth': AUTH_TOKEN, 'XSRF-Token': this.props.filesMeta.csrfToken },
      maxFiles: 10, // MB
      maxFilesize: 20, // MB
      parallelUploads: 10,
      createImageThumbnails: false,
      timeout: 360000,
    };

    // dropzone event handlers
    const eventHandlers = {
      init: dz => {
        // save the instance against the class so we can reference it later and reset it
        this.dropzone = dz;
      },
      maxfilesexceeded: (file) => { // if the user tries to upload more than the allowed number at the same time
        NotificationManager.error(`Error uploading ${file.name}`, 'Maximum parallel files exceeded. Please try again...');
        // clear dropzone
        this.dropzone.removeAllFiles(true);
      },
      error: (file, error) => {
        if (!file.accepted) { // if there's an error with the upload
          NotificationManager.error('Error uploading', error);
        }
      },
      totaluploadprogress: (progress) => { // gives us access to the upload progress
        // @todo add progress bar
        return progress;
      },
      success: f => { // called after a successful upload
        // call the parent callback
        this.props.uploadFilesSuccessCb(f);
        NotificationManager.success('Files uploaded', null, 2000);
      },
      complete: () => { // this is called after both success or error file upload
        // clear dropzone
        this.dropzone.removeAllFiles(true);
        // call the parent callback
        this.props.uploadFilesComplete();
      },
    };

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="uploadFile" /></h2>
          <div className={styles['form-subtitle']}>Maximum size per file: {djsConfig.maxFilesize}MB</div>
          <div className={styles['form-subtitle']}>Maximum parallel uploads: {djsConfig.maxFiles}</div>
          <meta name="csrf-token" content={this.props.filesMeta.csrfToken} />
          <DropzoneComponent className={styles['form-dropzone']} config={dropzoneConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    filesMeta: getFilesMeta(state),
  };
}

FileCreateWidget.propTypes = {
  filesMeta: PropTypes.object,
  uploadFilesSuccessCb: PropTypes.func.isRequired,
  uploadFilesComplete: PropTypes.func.isRequired,
  showAddFile: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(injectIntl(FileCreateWidget));
