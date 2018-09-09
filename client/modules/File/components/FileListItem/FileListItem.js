import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import filesize from 'filesize';

// Import Style
import styles from './FileListItem.css';

function FileListItem(props) {
  return (
    <tr className={styles['file-row']}>
      <td className={styles['file-name']}><a href="#" onClick={props.onClick}>{props.file.filename}</a></td>
      <td className={styles['file-ext']}>{props.file.extension}</td>
      <td className={styles['file-size']}>{filesize(props.file.size)}</td>
      <td className={styles['file-added']}>{moment(props.file.dateAdded).format('lll')}</td>
      <td className={styles['file-actions']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteFile" /></a></td>
    </tr>
  );
}

FileListItem.propTypes = {
  file: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    mimetype: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FileListItem;
