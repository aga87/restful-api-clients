import dotenv from 'dotenv';
import { KeyManagementServiceClient } from '@google-cloud/kms';

dotenv.config();

// Google KMS Client Config
const {
  GOOGLE_KMS_PROJECT_ID,
  GOOGLE_KMS_LOCATION_ID,
  GOOGLE_KMS_KEY_RING_ID,
  GOOGLE_KMS_KEY_ID
} = process.env;

if (
  !GOOGLE_KMS_PROJECT_ID ||
  !GOOGLE_KMS_LOCATION_ID ||
  !GOOGLE_KMS_KEY_RING_ID ||
  !GOOGLE_KMS_KEY_ID
) {
  throw new Error(
    'Missing required environment variables for Google Cloud KMS'
  );
}

// Instantiate the KMS Client
const kmsClient = new KeyManagementServiceClient();

// Build the key name
const keyName = kmsClient.cryptoKeyPath(
  GOOGLE_KMS_PROJECT_ID,
  GOOGLE_KMS_LOCATION_ID,
  GOOGLE_KMS_KEY_RING_ID,
  GOOGLE_KMS_KEY_ID
);

type EncryptionService = {
  encryptData: (data: string) => Promise<string>;
  decryptData: (encryptedData: string) => Promise<string>;
};

export const EncryptionService: EncryptionService = {
  encryptData: async (data: string): Promise<string> => {
    const [result] = await kmsClient.encrypt({
      name: keyName,
      plaintext: Buffer.from(data, 'utf8')
    });
    if (result && result.ciphertext) {
      // @ts-ignore - correct implementation based on the official docs: https://cloud.google.com/kms/docs/encrypt-decrypt
      return result.ciphertext.toString('base64');
    } else {
      throw new Error('Encryption failed');
    }
  },

  decryptData: async (encryptedData: string): Promise<string> => {
    const [result] = await kmsClient.decrypt({
      name: keyName,
      ciphertext: Buffer.from(encryptedData, 'base64')
    });
    if (result && result.plaintext) {
      return result.plaintext.toString();
    } else {
      throw new Error('Decryption failed');
    }
  }
};
