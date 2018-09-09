import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
import { API_URL, AUTH_TOKEN } from '../../../../util/apiCaller';
import { NotificationManager } from 'react-notifications';
// Import Style
import styles from './FileUploadWidget.css';

export class FileCreateWidget extends Component {
  render() {
    const cls = `${styles.form} ${(this.props.showAddFile ? styles.appear : '')}`;

    const dropzoneConfig = {
      postUrl: `${API_URL}/files`,
      dictRemoveFile: 'Delete',
      dictCancelUploadConfirmation: 'Are you sure to cancel upload?',
    };

    const djsConfig = {
      addRemoveLinks: false,
      headers: { 'x-auth': AUTH_TOKEN },
      maxFiles: 10, // MB
      maxFilesize: 20, // MB
      parallelUploads: 10,
      createImageThumbnails: false,
      timeout: 1000,
    };

    const eventHandlers = {
      init: dz => {
        // save the instance against the class so we can reference it later and reset it
        this.dropzone = dz;
      },
      sending: (formData, req) => {
        // @todo add CSRF token to req
        return req;
      },
      maxfilesexceeded: (file) => {
        NotificationManager.error(`Error uploading ${file.name}`, 'Maximum parallel files exceeded. Please try again...');
      },
      error: (file, error) => {
        NotificationManager.error('Error uploading', error);
      },
      totaluploadprogress: (progress) => {
        // @todo add progress bar
        return progress;
      },
      success: f => { this.props.uploadFilesSuccessCb(f); this.dropzone.removeAllFiles(true); },
    };

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="uploadFile" /></h2>
          <div className={styles['form-subtitle']}>Maximum size per file: {djsConfig.maxFilesize}MB</div>
          <div className={styles['form-subtitle']}>Maximum parallel uploads: {djsConfig.maxFiles}</div>
          <DropzoneComponent className={styles['form-dropzone']} config={dropzoneConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
        </div>
      </div>
    );
  }
}

FileCreateWidget.propTypes = {
  uploadFilesSuccessCb: PropTypes.func.isRequired,
  showAddFile: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FileCreateWidget);
