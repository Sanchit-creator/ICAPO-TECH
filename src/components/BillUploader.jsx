import React, { useState } from 'react';
import { Box, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Main = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled(Button)`
  margin-top: 20px;
`;

const PreviewContainer = styled.div`
  margin-top: 30px;
  width: 300px;
`;

const PdfPreview = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
`;

const ErrorSnackbar = styled(Snackbar)`
  margin-top: 20px;
`;

const BillUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setSelectedFile(null);
      setUploadStatus(null);
      setErrorMessage('Please select a PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a PDF file.');
      return;
    }

    setUploading(true);

    try {
      // Simulated API call to save the file and get the upload status
      const response = await saveFile(selectedFile);

      if (response.status === 'success') {
        setUploadStatus('File uploaded successfully.');
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      setUploadStatus('File upload failed.');
      setErrorMessage('An error occurred while uploading the file.');
    }

    setUploading(false);
  };

  const saveFile = (file) => {
    return new Promise((resolve, reject) => {
      // Simulating a delay to mimic server response
      setTimeout(() => {
        const randomNum = Math.random();
        if (randomNum < 0.8) {
          resolve({ status: 'success' });
        } else {
          reject();
        }
      }, 2000);
    });
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <Main>
      <Typography>Select File</Typography>
      <label htmlFor="file-input">
        <FileInput id="file-input" type="file" accept="application/pdf" onChange={handleFileChange} />
        <Button component="span" variant="contained" color="primary">
          Browse
        </Button>
      </label>
      <UploadButton
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        {uploading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
      </UploadButton>
      {selectedFile && (
        <PreviewContainer>
          <PdfPreview src={URL.createObjectURL(selectedFile)} />
        </PreviewContainer>
      )}
      {uploadStatus && <div>{uploadStatus}</div>}
      <ErrorSnackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Main>
  );
};

export default BillUploader;
