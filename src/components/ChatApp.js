import React, { useState } from 'react';
import axios from 'axios';
import { encryptMessage, decryptMessage } from '../utils/encryption';

const ChatApp = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    const encryptedMessage = encryptMessage(newMessage);
    await axios.post('/api/messages/send', { content: encryptedMessage, conversationId });
    setNewMessage('');
  };

  const fetchMessages = async () => {
    const response = await axios.get(`/api/messages/fetch/${conversationId}`);
    const decryptedMessages = response.data.map((msg) => ({
      ...msg,
      content: decryptMessage(msg.content),
    }));
    setMessages(decryptedMessages);
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={fetchMessages}>Fetch Messages</button>
    </div>
  );
};

export default ChatApp;