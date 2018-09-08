import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Dropzone from 'react-dropzone';

// Import Style
import styles from './FileUploadWidget.css';

export class FileCreateWidget extends Component {
  state = {
    accepted: [],
    rejected: [],
  }

  addFiles = () => {
    if (this.state.accepted) {
      this.props.addFiles(this.state.accepted);
    }
  };

  fileDropCallback = (acceptedFiles, rejectedFiles) => {
    this.setState({ accepted: acceptedFiles, rejected: rejectedFiles });

    // if (rejectedFiles.length > 0) {
    //   console.warn('Rejected:', rejectedFiles.map(f => f.name));
    // }

    // if (acceptedFiles.length > 0) {
    //   acceptedFiles.forEach(file => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const fileAsBinaryString = reader.result;
    //     };
    //     reader.onabort = () => console.log('file reading was aborted');
    //     reader.onerror = () => console.log('file reading has failed');

    //     reader.readAsBinaryString(file);
    //   });
    // }
  }

  render() {
    const cls = `${styles.form} ${(this.props.showAddFile ? styles.appear : '')}`;

    const dropzoneConfig = {
      maxSize: 1024 * 1000 * 20,
    };

    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="uploadFile" /></h2>
          <div className={styles['form-subtitle']}>Maximum size per file: 20MB</div>
          <Dropzone className={styles['form-dropzone']} {...dropzoneConfig} onDrop={this.fileDropCallback}>
            {(this.state.accepted.length === 0 && this.state.rejected.lengt === 0) && <p>Try dropping some files here, or click to select files to upload.</p>}
            <div className={styles['dropzone-files-result']}>
              {this.state.accepted.length > 0 &&
                <div className={styles['dropzone-accepted']}>
                  <span>Accepted files:</span>{this.state.accepted.map(f => <div key={f.name}>{f.name}</div>)}
                </div>}
              {this.state.rejected.length > 0 &&
                <div className={styles['dropzone-rejected']}>
                  <span>Rejected files:</span> {this.state.rejected.map(f => <div key={f.name}>{f.name}</div>)}
                </div>}
            </div>
          </Dropzone>
          {this.state.accepted.length > 0 && <a className={styles['file-submit-button']} href="#" onClick={this.addFiles}><FormattedMessage id="submit" /></a>}
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
