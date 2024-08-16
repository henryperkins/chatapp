const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create a new project
router.post('/create', async (req, res) => {
  const { name, description, systemRole } = req.body;
  const project = new Project({ name, description, systemRole });
  await project.save();
  res.send({ success: true, project });
});

// Update the system role of a project
router.put('/update-system-role', async (req, res) => {
  const { projectId, systemRole } = req.body;
  await Project.updateOne({ _id: projectId }, { systemRole });
  res.send({ success: true });
});

module.exports = router;