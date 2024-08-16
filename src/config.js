module.exports = {
  mongoURI: process.env.MONGO_URI || 'your-mongodb-connection-string',
  jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret'
};