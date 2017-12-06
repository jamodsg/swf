import { ICreation } from './creation.interface';
// import { IRole } from './role.interface';
// import { IMember } from './member.interface';

export interface IUser {
  id?: string;
  emailVerified?: boolean;
  password?: string;
  providerId?: string;

  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  photoURL?: string;

  onlineStatus?: string;
  assignedRole: string;
  // assignedMember?: IMember | string;

  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };

  creation?: ICreation;
}
