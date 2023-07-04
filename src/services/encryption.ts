import crypto from 'crypto';

type EncryptionService = {
  algorithm: string;
  securityKey: Buffer;
  initVector: Buffer;
  encryptData: (data: string) => string;
  decryptData: (encryptedData: string) => string;
};

export const EncryptionService: EncryptionService = {
  algorithm: 'aes-256-cbc',
  securityKey: crypto.randomBytes(32),
  initVector: crypto.randomBytes(16),

  encryptData: (data: string): string => {
    const cipher = crypto.createCipheriv(
      EncryptionService.algorithm,
      EncryptionService.securityKey,
      EncryptionService.initVector
    );
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
  },

  decryptData: (encryptedData: string): string => {
    const decipher = crypto.createDecipheriv(
      EncryptionService.algorithm,
      EncryptionService.securityKey,
      EncryptionService.initVector
    );
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }
};
