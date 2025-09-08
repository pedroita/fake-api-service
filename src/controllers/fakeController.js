const fs = require("fs");
const path = require("path");
const { encryptAES256GCM } = require("../services/encryptionService");
const { contactsPath } = require("../config/environment");

class FakeController {
  getEncryptedUsers(req, res) {
    try {
      const users = JSON.parse(fs.readFileSync(path.resolve(contactsPath), "utf8"));
      const payload = encryptAES256GCM(JSON.stringify(users));
      res.json({ success: true, data: { encrypted: payload } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao ler o arquivo JSON",
        error: err.message,
      });
    }
  }

  clearUsers(req, res) {
    try {
      fs.writeFileSync(path.resolve(contactsPath), JSON.stringify([]));
      res.json({ success: true, message: "Tabela users limpa" });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Erro ao limpar o arquivo JSON",
        error: err.message,
      });
    }
  }
}

module.exports = new FakeController();
