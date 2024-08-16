import React, { useState } from 'react';
import ProjectManager from './ProjectManager';
import ConversationManager from './ConversationManager';
import Knowledgebase from './Knowledgebase';
import KnowledgebaseUpload from './KnowledgebaseUpload';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="app">
      {!selectedProject ? (
        <ProjectManager setSelectedProject={setSelectedProject} />
      ) : (
        <>
          <ConversationManager projectId={selectedProject._id} />
          <Knowledgebase knowledgebase={selectedProject.knowledgebase} />
          <KnowledgebaseUpload projectId={selectedProject._id} />
        </>
      )}
    </div>
  );
};

export default App;