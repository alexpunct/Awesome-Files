import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

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

import { NotificationManager } from 'react-notifications';

class FileListPage extends Component {
  // We use the component state for UI state, like applied filters, sort, pagination
  state = {
    sort: '-dateAdded',
  }

  componentDidMount() {
    // fetch all files from the API
    this.props.dispatch(fetchFiles(this.state));
    // fetch files meta-data
    this.props.dispatch(fetchFilesMeta(this.state));
  }

  componentWillUpdate(nextProps, nextState) {
    // if the UI state was updated (like a new filter added), we re-fetch the data
    if (!_.isEqual(this.state, nextState)) {
      this.props.dispatch(fetchFiles(nextState));
    }
  }

  handleDeleteFile = cuid => {
    if (confirm('Do you want to delete this file')) { // eslint-disable-line
      // request the deletion of the file from the API
      this.props.dispatch(deleteFileRequest(cuid));
      // after deleting a file we want to re-fetch the meta-data
      // we do this in case some of the meta-data refers to files that are no longer present
      this.props.dispatch(fetchFilesMeta(this.state));

      NotificationManager.success('File deleted', null, 2000);
    }
  };

  handleDownloadFile = (cuid, fileName) => { // request downloading of a file
    this.props.dispatch(downloadFileRequest(cuid, fileName));
  }

  uploadFilesSuccess = () => { // callback after a file was uploaded successfully
    this.props.dispatch(toggleUploadFileForm());
  };

  uploadFilesComplete = () => { // callback after a file upload (both successful or error)
    // re-fetch the files
    this.props.dispatch(fetchFiles(this.state));
    // re-fetch the meta-data
    this.props.dispatch(fetchFilesMeta(this.state));
  }

  handleSearchFile = (filename, extension) => { // callback for when the search form changed
    // update the UI state which should re-fetch the data >> see componentWillUpdate above
    this.setState({ filename: `/${filename}/i`, extension: `${extension}` });
  }

  render() {
    return (
      <div>
        <FileUploadWidget uploadFilesSuccessCb={this.uploadFilesSuccess} uploadFilesComplete={this.uploadFilesComplete} showAddFile={this.props.showAddFile} />
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
    showAddFile: getShowUploadFileForm(state), // toggle the file upload form
    files: getFiles(state), // fetch files from the API
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
