import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import FileList from '../../components/FileList';
import FileUploadWidget from '../../components/FileUploadWidget/FileUploadWidget';
import FileSearchWidget from '../../components/FileSearchWidget/FileSearchWidget';

// Import Actions
import { fetchFiles, fetchFilesMeta, deleteFileRequest, downloadFileRequest } from '../../FileActions';
import { toggleUploadFileForm } from '../../../App/AppActions';

// Import Selectors
import { getShowUploadFileForm } from '../../../App/AppReducer';
import { getFiles } from '../../FileReducer';
import _ from 'lodash';

class FileListPage extends Component {
  state = {
    sort: '-dateAdded',
  }

  componentDidMount() {
    this.props.dispatch(fetchFiles(this.state));
    this.props.dispatch(fetchFilesMeta(this.state));
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(this.state, nextState)) {
      this.props.dispatch(fetchFiles(nextState));
    }
  }

  handleDeleteFile = file => {
    if (confirm('Do you want to delete this file')) { // eslint-disable-line
      this.props.dispatch(deleteFileRequest(file));
      this.props.dispatch(fetchFilesMeta(this.state));
    }
  };

  handleDownloadFile = (cuid, fileName) => {
    this.props.dispatch(downloadFileRequest(cuid, fileName));
  }

  uploadFilesSuccess = () => {
    this.props.dispatch(toggleUploadFileForm());
    this.props.dispatch(fetchFiles(this.state));
    this.props.dispatch(fetchFilesMeta(this.state));
  };

  handleSearchFile = (filename, extension) => {
    this.setState({ filename: `/${filename}/i`, extension: `${extension}` });
  }

  render() {
    return (
      <div>
        <FileUploadWidget uploadFilesSuccessCb={this.uploadFilesSuccess} showAddFile={this.props.showAddFile} />
        <FileSearchWidget searchFile={this.handleSearchFile} />
        <FileList handleDeleteFile={this.handleDeleteFile} handleDownloadFile={this.handleDownloadFile} files={this.props.files} />
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
    extension: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })),
  showAddFile: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

FileListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(FileListPage);
