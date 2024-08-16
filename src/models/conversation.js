const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtifactSchema = new Schema({
  type: String,
  content: String,
  title: String,
  createdAt: { type: Date, default: Date.now }
});

const ConversationSchema = new Schema({
  title: String,
  messages: Array,
  folder: { type: String, default: 'Uncategorized' },
  artifacts: [ArtifactSchema],
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Conversation', ConversationSchema);