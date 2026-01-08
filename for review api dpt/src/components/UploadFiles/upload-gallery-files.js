import React, { Component } from "react";
import UploadService from "../Services/upload-files";
import config from '../../config';

export default class UploadGalleryFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };

    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  componentDidMount() {
    const { uploadType } = this.props;
    const storageKey = `filedata_${uploadType}`;
    let filedata = localStorage.getItem(storageKey);
    this.setState({
      fileInfos: filedata ? JSON.parse(filedata) : [],
    });
  }
  

  selectFile(event) {
    const selectedFile = event.target.files[0]; // Get the first selected file
    const allowedTypes = ['image/jpeg', 'image/png']; // Allowed file types
  
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      this.setState({
        selectedFiles: selectedFile,
      });
    } else {
      this.setState({
        selectedFiles: undefined,
        message: "Please select a valid image file (JPEG/PNG).",
      });
    }
  }
  
  upload(event) {
    event.preventDefault();
    const { uploadType, onFileUpload } = this.props;
    const { selectedFiles } = this.state;
  
    if (selectedFiles) {
      UploadService.upload(selectedFiles, (event) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
      })
        .then((response) => {
          const fileName = response.data.filename;
          const storageKey = `filedata_${uploadType}`;
          localStorage.setItem(storageKey, JSON.stringify([fileName]));
  
          this.setState({
            message: "File uploaded successfully",
            fileInfos: [fileName],
            selectedFiles: undefined, // Clear selected file after upload
            progress: 0, // Reset progress after upload
          });
  
          // Update the form data with the uploaded file name
          if (onFileUpload && typeof onFileUpload === 'function') {
            onFileUpload([fileName], uploadType);
          }
        })
        .catch(() => {
          this.setState({
            progress: 0,
            message: "Could not upload the file!",
            selectedFiles: undefined,
          });
        });
    } else {
      this.setState({
        message: "Please select a file before uploading.",
      });
    }
  }
  

  removeFile(event, index) {
    event.stopPropagation();
    let fileInfos = this.state.fileInfos.slice();
    fileInfos.splice(index, 1);
    const { uploadType } = this.props;
    const storageKey = `filedata_${uploadType}`;
    localStorage.setItem(storageKey, JSON.stringify(fileInfos));

    this.setState({
      fileInfos: fileInfos,
    });
  }

  render() {
    const {
      selectedFiles,
      progress,
      message,
      fileInfos,
    } = this.state;

    return (
      <div>
        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={(event) => this.upload(event)}
        >
          Upload
        </button>


        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item position-relative" key={index}>
                  <img src={`${config.baseUrl}/data/uploads/${file}`} width={`100px`} alt={`Gallery ${index}`} />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    style={{ color: 'black', background: 'none', border: 'none' }}
                    onClick={(event) => this.removeFile(event, index)}
                  >
                    ✖
                  </button>

                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}