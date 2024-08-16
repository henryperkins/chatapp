const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Conversation = require('../models/conversation');

// Add artifact to knowledgebase
router.post('/knowledgebase/add', async (req, res) => {
  const { projectId, artifactId, conversationId } = req.body;
  const conversation = await Conversation.findById(conversationId);
  
  if (conversation) {
    const artifact = conversation.artifacts.id(artifactId);
    if (artifact) {
      await Project.updateOne(
        { _id: projectId },
        { $push: { knowledgebase: artifact } }
      );
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Artifact not found" });
    }
  } else {
    res.status(404).send({ error: "Conversation not found" });
  }
});

// Remove artifact from knowledgebase
router.post('/knowledgebase/remove', async (req, res) => {
  const { projectId, artifactId } = req.body;
  await Project.updateOne(
    { _id: projectId },
    { $pull: { knowledgebase: { _id: artifactId } } }
  );
  res.send({ success: true });
});

module.exports = router;