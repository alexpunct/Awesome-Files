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
    };

    const djsConfig = {
      addRemoveLinks: false,
    };

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="uploadFile" /></h2>
          <div className={styles['form-subtitle']}>Maximum size per file: 20MB</div>
          <DropzoneComponent className={styles['form-dropzone']} config={dropzoneConfig} djsConfig={djsConfig} />
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
