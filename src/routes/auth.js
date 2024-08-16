const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/user'); // Define a User model as needed

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send({ success: true });
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '1h' });
    res.send({ success: true, token });
  } else {
    res.status(401).send({ error: 'Invalid credentials' });
  }
});

// Setup MFA
router.post('/setup-mfa', async (req, res) => {
  const { userId } = req.body; // Assume userId is provided
  const secret = speakeasy.generateSecret();
  await User.updateOne({ _id: userId }, { mfaSecret: secret.base32 });
  
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.send({ secret: secret.base32, qrCode: data_url });
  });
});

// Verify MFA token
router.post('/verify-mfa', async (req, res) => {
  const { userId, token } = req.body;
  const user = await User.findById(userId);
  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });
  res.send({ verified });
});

module.exports = router;