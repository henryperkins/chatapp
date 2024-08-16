import React from 'react';
import axios from 'axios';

const ArtifactSidebar = ({ projectId, conversationId, artifacts }) => {
  const addToKnowledgebase = async (artifactId) => {
    const response = await axios.post('/api/artifacts/knowledgebase/add', {
      projectId,
      artifactId,
      conversationId
    });
    if (response.data.success) {
      alert('Artifact added to knowledgebase!');
    }
  };

  return (
    <div className="artifact-sidebar">
      <h2>Artifacts</h2>
      {artifacts.map((artifact) => (
        <div key={artifact._id} className="artifact">
          <h3>{artifact.title || artifact.type}</h3>
          <button onClick={() => addToKnowledgebase(artifact._id)}>Add to KB</button>
        </div>
      ))}
    </div>
  );
};

export default ArtifactSidebar;