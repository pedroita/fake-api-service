const crypto = require('crypto');
const { getKeyFromEnv } = require('../config/environment');

class EncryptionService {
  constructor() {
    this.key = getKeyFromEnv();
  }

  encryptAES256GCM(plainText) {
    try {
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
      
      let encrypted = cipher.update(plainText, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      const authTag = cipher.getAuthTag().toString('hex');

      return {
        iv: iv.toString('hex'),
        authTag,
        encrypted,
        algorithm: 'aes-256-gcm'
      };
    } catch (error) {
      throw new Error(`Falha na criptografia: ${error.message}`);
    }
  }
}

module.exports = new EncryptionService();