import { EncryptionService } from '../../../services/encryption';

describe('EncryptionService', () => {
  const data = 'hello world';

  let encryptedData: any;

  beforeAll(async () => {
    encryptedData = await EncryptionService.encryptData(data);
  });

  describe('encryptData', () => {
    it('should encrypt the data and return a valid base64 string', () => {
      // Encrypted data should not be the same as the original data
      expect(encryptedData).not.toBe(data);
      // Encrypted data should be a non-empty string
      expect(typeof encryptedData).toBe('string');
      expect(encryptedData.length).toBeGreaterThan(0);
      const base64Regex = /^[a-zA-Z0-9+/]+={0,2}$/;
      expect(base64Regex.test(encryptedData)).toBe(true);
    });
  });

  describe('decryptData', () => {
    it('should decrypt the encrypted data', async () => {
      const decryptedData = await EncryptionService.decryptData(encryptedData);
      expect(decryptedData).toBe(data);
    });
  });
});
