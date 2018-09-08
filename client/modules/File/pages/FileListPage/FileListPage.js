import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import FileList from '../../components/FileList';
import FileUploadWidget from '../../components/FileUploadWidget/FileUploadWidget';

// Import Actions
import { addFileRequest, fetchFiles, deleteFileRequest } from '../../FileActions';
import { toggleUploadFileForm } from '../../../App/AppActions';

// Import Selectors
import { getShowUploadFileForm } from '../../../App/AppReducer';
import { getFiles } from '../../FileReducer';

class FileListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchFiles());
  }

  handleDeleteFile = file => {
    if (confirm('Do you want to delete this file')) { // eslint-disable-line
      this.props.dispatch(deleteFileRequest(file));
    }
  };

  handleAddFiles = (files) => {
    // files.forEach(file => {
    //   // console.log('====================================');
    //   // console.log(file);
    //   // console.log('====================================');

    //   // const reader = new FileReader();
    //   // reader.onload = () => {
    //   //   const fileAsBinaryString = reader.result;
    //   //   console.log('filebinary', fileAsBinaryString);
    //   // };
    //   // reader.onabort = () => console.log('file reading was aborted');
    //   // reader.onerror = () => console.log('file reading has failed');

    //   // reader.readAsBinaryString(file);
    //   this.props.dispatch(addFileRequest(file));
    // });

    this.props.dispatch(addFileRequest(files[0]));
  };

  render() {
    return (
      <div>
        <FileUploadWidget addFiles={this.handleAddFiles} showAddFile={this.props.showAddFile} />
        <FileList handleDeleteFile={this.handleDeleteFile} files={this.props.files} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FileListPage.need = [() => { return fetchFiles(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddFile: getShowUploadFileForm(state),
    files: getFiles(state),
  };
}

FileListPage.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    filename: PropTypes.string.isRequired,
    mimetype: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })).isRequired,
  showAddFile: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

FileListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(FileListPage);
