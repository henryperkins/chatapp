const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const config = require('./config');
const projectRoutes = require('./routes/projects');
const knowledgebaseRoutes = require('./routes/knowledgebase');
const artifactRoutes = require('./routes/artifacts');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/projects', projectRoutes);
app.use('/api/knowledgebase', knowledgebaseRoutes);
app.use('/api/artifacts', artifactRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});