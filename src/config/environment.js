const getKeyFromEnv = () => {
  const raw = process.env.AES_KEY;
  if (!raw) throw new Error('AES_KEY não setada (env). Deve ser 32 bytes em hex.');
  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, 'hex');
  throw new Error('AES_KEY deve ser 64 caracteres hexadecimais (32 bytes)');
};

module.exports = {
  getKeyFromEnv,
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development'
};