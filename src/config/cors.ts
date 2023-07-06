import { CorsOptions } from 'cors';

// Set CORS
const { CLIENT_URL } = process.env;
const host = CLIENT_URL || 'http://localhost:3000';

// Assuming more than one portal will want to access the Clients API (e.g. Finance & Marketing)
const whitelist = [
  host
  // host2
];

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
