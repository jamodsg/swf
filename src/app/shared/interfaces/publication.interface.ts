import { IUser } from './user.interface';

export interface IPublication {
  status: string;
  date: Date;
  time: string;
  from?: IUser | string;
}
