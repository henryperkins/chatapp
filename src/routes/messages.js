const express = require('express');
const { encryptMessage, decryptMessage } = require('../utils/encryption');
const Conversation = require('../models/conversation');

const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  const { conversationId, content } = req.body;
  const encryptedContent = encryptMessage(content);

  const conversation = await Conversation.findById(conversationId);
  if (conversation) {
    conversation.messages.push({ content: encryptedContent });
    await conversation.save();
    res.send({ success: true });
  } else {
    res.status(404).send({ error: 'Conversation not found' });
  }
});

// Fetch messages
router.get('/fetch/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findById(conversationId);
  if (conversation) {
    const decryptedMessages = conversation.messages.map((msg) => ({
      ...msg,
      content: decryptMessage(msg.content),
    }));
    res.send(decryptedMessages);
  } else {
    res.status(404).send({ error: 'Conversation not found' });
  }
});

module.exports = router;