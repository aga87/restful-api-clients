import { Schema, model } from 'mongoose';
import { EncryptionService } from '../services/encryption';
import type { ClientRecord } from '../types/types';

const clientSchema = new Schema<ClientRecord>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    postalCode: {
      type: String,
      required: true
    }
  }
});

// Pre-save middleware
clientSchema.pre<ClientRecord>('save', function (next) {
  const client = this;

  // Trim and encrypt the firstName, lastName, and address.postalCode fields
  client.firstName = EncryptionService.encryptData(client.firstName.trim());
  client.lastName = EncryptionService.encryptData(client.lastName.trim());
  client.address.postalCode = EncryptionService.encryptData(
    client.address.postalCode.trim()
  );

  next();
});

export const Client = model<ClientRecord>('Client', clientSchema);
