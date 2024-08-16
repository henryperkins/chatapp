import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConversationManager = ({ projectId }) => {
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await axios.get(`/api/projects/${projectId}/conversations`);
      setConversations(response.data);
    };
    fetchConversations();
  }, [projectId]);

  const createConversation = async () => {
    const response = await axios.post('/api/conversations/create', {
      title: newConversation,
      projectId
    });
    if (response.data.success) {
      setConversations([...conversations, response.data.conversation]);
      setNewConversation('');
    }
  };

  return (
    <div>
      <h2>Conversations</h2>
      <input
        type="text"
        value={newConversation}
        onChange={(e) => setNewConversation(e.target.value)}
        placeholder="Conversation Title"
      />
      <button onClick={createConversation}>Create Conversation</button>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation._id}>
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationManager;