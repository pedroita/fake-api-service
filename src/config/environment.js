const path = require("path");
require("dotenv").config();

module.exports = {
  port: process.env.FAKE_PORT || 3000,
  aesKey:
    process.env.FAKE_AES_KEY ||
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  contactsPath: path.resolve(__dirname, "../database/contacts.json"),
};
