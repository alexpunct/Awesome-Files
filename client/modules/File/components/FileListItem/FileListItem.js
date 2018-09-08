import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import filesize from 'filesize';

// Import Style
import styles from './FileListItem.css';

function FileListItem(props) {
  return (
    <div className={styles['single-files']}>
      <h3 className={styles['file-name']}>
        <a href="#" onClick={props.onClick}>{props.file.filename}</a>
      </h3>
      <p className={styles['file-size']}>Date: {moment(props.file.dateAdded).format('lll')}</p>
      <p className={styles['file-size']}>Size: {filesize(props.file.size)}</p>
      <p className={styles['file-type']}>Type: {props.file.mimetype}</p>
      <p className={styles['files-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteFile" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

FileListItem.propTypes = {
  file: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    mimetype: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FileListItem;
