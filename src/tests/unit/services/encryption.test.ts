import { EncryptionService } from '../../../services/encryption';

describe('EncryptionService', () => {
  const data = 'hello world';

  let encryptedData: any;

  beforeEach(() => {
    encryptedData = EncryptionService.encryptData(data);
  });

  describe('encryptData', () => {
    it('should encrypt the data and return a valid hexadecimal string', () => {
      // Encrypted data should not be the same as the original data
      expect(encryptedData).not.toBe(data);
      // Encrypted data should be a non-empty string
      expect(typeof encryptedData).toBe('string');
      expect(encryptedData.length).toBeGreaterThan(0);
      // Encrypted data should be a valid hexadecimal string
      const hexRegex = /^[0-9a-fA-F]+$/;
      expect(hexRegex.test(encryptedData)).toBe(true);
    });
  });

  describe('decryptData', () => {
    it('should decrypt the encrypted data', () => {
      const decryptedData = EncryptionService.decryptData(encryptedData);
      expect(decryptedData).toBe(data);
    });
  });
});
