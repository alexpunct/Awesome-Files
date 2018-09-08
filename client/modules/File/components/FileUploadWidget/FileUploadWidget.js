import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import DropzoneComponent from 'react-dropzone-component';
import { API_URL } from '../../../../util/apiCaller';
// Import Style
import styles from './FileUploadWidget.css';

export class FileCreateWidget extends Component {
  render() {
    const cls = `${styles.form} ${(this.props.showAddFile ? styles.appear : '')}`;

    const dropzoneConfig = {
      postUrl: `${API_URL}/files`,
      dictRemoveFile: 'Delete',
      dictCancelUploadConfirmation: 'Are you sure to cancel upload?',
      createImageThumbnails: false,
    };

    const djsConfig = {
      addRemoveLinks: false,
      maxFilesize: 20, // MB
    };

    const eventHandlers = {
      init: dz => {
        // save the instance against the class so we can reference it later and reset it
        this.dropzone = dz;
      },
      success: f => { this.props.addFiles(f); this.dropzone.removeAllFiles(true); },
    };

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="uploadFile" /></h2>
          <div className={styles['form-subtitle']}>Maximum size per file: {djsConfig.maxFilesize}MB</div>
          <DropzoneComponent className={styles['form-dropzone']} config={dropzoneConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
        </div>
      </div>
    );
  }
}

FileCreateWidget.propTypes = {
  addFiles: PropTypes.func.isRequired,
  showAddFile: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FileCreateWidget);
