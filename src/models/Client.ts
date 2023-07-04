import { Schema, model } from 'mongoose';
import Joi from 'joi';
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

// Post-find middleware
clientSchema.post('find', function (docs: ClientRecord[]) {
  // Decrypt the firstName, lastName, and address.postalCode fields for each retrieved document
  docs.forEach((doc) => {
    doc.firstName = EncryptionService.decryptData(doc.firstName);
    doc.lastName = EncryptionService.decryptData(doc.lastName);
    doc.address.postalCode = EncryptionService.decryptData(
      doc.address.postalCode
    );
  });
});

export const Client = model<ClientRecord>('Client', clientSchema);

export const validateClientSchema = (newClient: unknown): null | string[] => {
  const validClientSchema = Joi.object({
    firstName: Joi.string().trim().max(100).required(),
    lastName: Joi.string().trim().max(100).required(),
    address: Joi.object({
      postalCode: Joi.string().trim().max(30).required()
    }).required()
  });

  const { error } = validClientSchema.validate(
    newClient,
    // Get all errors (not only the first one)
    { abortEarly: false }
  );

  if (error) {
    const errorList: string[] = [];
    error.details.forEach((error) => errorList.push(error.message));
    return errorList;
  }
  return null;
};
