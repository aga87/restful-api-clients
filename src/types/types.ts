import { Types } from 'mongoose';

export type ClientRecord = {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  address: {
    postalCode: string;
  };
};
