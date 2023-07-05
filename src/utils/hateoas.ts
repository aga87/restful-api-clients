import { Request } from 'express';

let baseURL = process.env.BASE_URL;

if (!baseURL) {
  if (process.env.NODE_ENV === 'production') {
    // Ensure correct HATEOAS values in production
    throw new Error(
      'The BASE_URL environment variable is not set in production.'
    );
  } else {
    baseURL = 'http://localhost:5000';
  }
}

export const selfHATEOAS = (req: Request) => ({
  href: `${baseURL}${req.originalUrl}`,
  rel: 'self',
  method: req.method
});

export const healthCheckHATEOAS = () => ({
  href: `${baseURL}/`,
  rel: 'health check',
  method: 'GET'
});

export const clientsHATEOAS = () => ({
  clients: {
    href: `${baseURL}/api/v1/clients`,
    rel: 'clients',
    method: 'GET'
  },
  addClient: {
    href: `${baseURL}/api/v1/clients`,
    rel: 'add client',
    method: 'POST',
    schema: {
      firstName: {
        type: 'string',
        required: true,
        maxLength: 100
      },
      lastName: {
        type: 'string',
        required: true,
        maxLength: 100
      },
      address: {
        postalCode: {
          type: 'string',
          required: true,
          maxLength: 30
        }
      }
    }
  }
});
