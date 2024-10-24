import React, { useState } from 'react';
import './StudentForm.css'; // Import the CSS file

const Exceldataupload = () => {
  const [driveLink, setDriveLink] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleChange = (event) => {
    setDriveLink(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    // Create the payload with the drive link
    const payload = {
      file_id: driveLink,
    };

    try {
      // Send the file link to your backend
      const response = await fetch('http://127.0.0.1:8000/api/exceluploadview/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to upload file to server');
      }

      const uploadData = await response.json();
      console.log(uploadData)
      setUploadMessage('Upload successful: ' + JSON.stringify(uploadData));
    } catch (error) {
      console.error('Error:', error);
      setUploadMessage('Upload failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="text"
        placeholder="Enter Google Drive File ID"
        value={driveLink}
        onChange={handleChange}
        required
      />
      <button type="submit">Upload from Google Drive</button>
      <p>{uploadMessage}</p>
    </form>
  );
};

export default Exceldataupload;
