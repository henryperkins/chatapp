import React from 'react';

const Knowledgebase = ({ knowledgebase }) => {
  return (
    <div className="knowledgebase">
      <h2>Knowledgebase</h2>
      {knowledgebase.map((artifact) => (
        <div key={artifact._id} className="artifact">
          <h3>{artifact.title || artifact.type}</h3>
          <pre>{artifact.content}</pre>
        </div>
      ))}
    </div>
  );
};

export default Knowledgebase;