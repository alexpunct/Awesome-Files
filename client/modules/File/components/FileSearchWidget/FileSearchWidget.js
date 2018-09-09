import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { getFilesMeta } from '../../FileReducer';
import _ from 'lodash';

// Import Style
import styles from './FileSearchWidget.css';

export class FileSearchWidget extends Component {

  searchFile = () => {
    const filenameRef = this.refs.filename;
    const typeRef = this.refs.type;
    this.props.searchFile(filenameRef.value, typeRef.value);
  };

  _handleOnChange = () => {
    this.searchFile();
  }

  render() {
    if (!this.props.filesMeta || !this.props.filesMeta.allExtensions) {
      return <div>Loading...</div>;
    }

    return (
      <div className={`${styles.form} ${styles.appear}`}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Filter files</h2>
          <input placeholder="File name" className={styles['form-field']} ref="filename" onChange={this._handleOnChange} />
          <select placeholder="File type" className={styles['form-field']} ref="type" onChange={this._handleOnChange}>
            <option value="">-- All --</option>
            {this.props.filesMeta.allExtensions.map(ext =>
              <option value={ext} key={ext}>{ext}</option>
            )}
          </select>
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

FileSearchWidget.propTypes = {
  filesMeta: PropTypes.object,
  searchFile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default connect(mapStateToProps)(injectIntl(FileSearchWidget));
