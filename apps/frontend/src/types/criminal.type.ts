import { User } from './user.type';

export type Criminal = {
  id: string;
  criminalType: boolean;
  users: User;
  createdAt: string;
  updatedAt: string;
};
