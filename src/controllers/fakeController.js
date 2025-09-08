const fs = require('fs');
const path = require('path');
const encryptionService = require('../services/encryptionService');

const contactsPath = path.join(__dirname, '..', '..', 'database', 'contacts.json');

class FakeController {
  async getEncryptedData(req, res, next) {
    try {
      const users = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
      const encryptedPayload = encryptionService.encryptAES256GCM(JSON.stringify(users));
      
      res.json({ 
        success: true, 
        data: { encrypted: encryptedPayload } 
      });
    } catch (err) {
      next(err);
    }
  }

  async clearData(req, res, next) {
    try {
      fs.writeFileSync(contactsPath, JSON.stringify([]));
      res.json({ 
        success: true, 
        message: "Tabela users limpa com sucesso" 
      });
    } catch (err) {
      next(err);
    }
  }

  healthCheck(req, res) {
    res.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      service: 'Fake API Service'
    });
  }
}

module.exports = new FakeController();