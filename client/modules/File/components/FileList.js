import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import FileListItem from './FileListItem/FileListItem';

function FileList(props) {
  // do we have any files? If not show something
  if (!props.files || props.files.length === 0) {
    return <div>No files uploaded yet...</div>;
  }
  return (
    <table className="listView" style={{ width: '100%' }}>
      <thead style={{ fontWeight: 'bold', fontSize: 18 }}>
        <tr>
          <td>File name</td>
          <td>Extension</td>
          <td>Size</td>
          <td>Date added</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          props.files.map(file => (
            <FileListItem
              file={file}
              key={file.cuid}
              onClick={() => props.handleDownloadFile(file.cuid, file.filename)}
              onDelete={() => props.handleDeleteFile(file.cuid)}
            />
          ))
        }
      </tbody>

    </table>
  );
}

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    filename: PropTypes.string.isRequired,
    mimetype: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })),
  handleDeleteFile: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
};

export default FileList;
