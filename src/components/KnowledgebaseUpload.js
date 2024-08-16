import React, { useState } from 'react';
import axios from 'axios';

const KnowledgebaseUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);
    formData.append('title', title);

    const response = await axios.post('/api/knowledgebase/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.success) {
      alert('File uploaded successfully!');
      setFile(null);
      setTitle('');
    }
  };

  const addTextContent = async () => {
    const response = await axios.post('/api/knowledgebase/add-text', {
      projectId,
      title,
      content: textContent,
    });

    if (response.data.success) {
      alert('Text content added successfully!');
      setTextContent('');
      setTitle('');
    }
  };

  return (
    <div>
      <h3>Upload to Knowledgebase</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={!file}>
          Upload File
        </button>
      </div>
      <textarea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Paste plain text here"
        rows="4"
      />
      <button onClick={addTextContent} disabled={!textContent}>
        Add Text
      </button>
    </div>
  );
};

export default KnowledgebaseUpload;