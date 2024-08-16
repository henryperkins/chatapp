const mongoose = require('mongoose');
const { Schema } = mongoose;

const KnowledgebaseSchema = new Schema({
  title: String,
  content: String,
  type: String,
  file: { data: Buffer, contentType: String },
  uploadedAt: { type: Date, default: Date.now }
});

const ProjectSchema = new Schema({
  name: String,
  description: String,
  systemRole: String,
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  knowledgebase: [KnowledgebaseSchema],
});

module.exports = mongoose.model('Project', ProjectSchema);