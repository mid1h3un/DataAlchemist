import React from 'react';
import axios from 'axios';

function FileUploader({ onUpload }) {
  const handleChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let file of files) {
      formData.append('files', file);
    }

    try {
      const res = await axios.post('https://dataalchemistbackend.onrender.com', formData);
      onUpload(res.data);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="section">
      <h3>Upload CSV or Excel Files</h3>
      <input type="file" multiple accept=".csv,.xlsx" onChange={handleChange} />
    </div>
  );
}

export default FileUploader;
