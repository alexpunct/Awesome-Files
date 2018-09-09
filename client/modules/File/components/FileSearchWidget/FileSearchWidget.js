import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

// Import Selectors
import { getFilesMeta } from '../../FileReducer';

// Import Style
import styles from './FileSearchWidget.css';

export class FileSearchWidget extends Component {

  // take the values of the search fields and call the parent callback
  searchFile = () => {
    const filenameRef = this.refs.filename;
    const typeRef = this.refs.type;
    this.props.searchFile(filenameRef.value, typeRef.value);
  };

  // when a field is changed, trigger a search
  _handleOnChange = () => {
    this.searchFile();
  }

  render() {
    // we need the filesMeta so we know which are all the available file extension
    // so we can populate the select element
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
