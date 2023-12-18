import { user } from './user.type';

export type Criminal = {
  id: string;
  criminalType: boolean;
  users: user;
  createdAt: string;
  updatedAt: string;
};
