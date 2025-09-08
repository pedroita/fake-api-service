const crypto = require("crypto");
const { aesKey } = require("../config/environment");

const key = Buffer.from(aesKey, "hex");

function encryptAES256GCM(plainText) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    iv: iv.toString("hex"),
    authTag,
    encrypted,
    algorithm: "aes-256-gcm",
  };
}

module.exports = { encryptAES256GCM };
