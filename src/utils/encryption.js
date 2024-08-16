const CryptoJS = require('crypto-js');

const secretKey = 'your-secret-key';

const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptMessage,
  decryptMessage,
};