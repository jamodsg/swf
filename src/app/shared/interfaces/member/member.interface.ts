import { IAddress } from '../address.interface';
import { IContact } from '../contact.interface';
import { IProfile } from './profile.interface';
import { ICreation } from '../creation.interface';
import { ICategory } from '../category.interface';
import { IClubData } from './club-data.interface';
import { IClubDFBData } from './club-dfb-data.interface';
import { IClubAHData } from './club-ah-data.interface';
import { IInterview } from './interview.interface';

export interface IMember {
  id?: string;
  isImported: boolean;
  mainData: IMemberMainData;
  address?: IAddress;
  contact?: IContact;
  clubData?: IClubData;
  ahData?: IClubAHData;
  dfbData?: IClubDFBData;
  profile?: IProfile[];
  otherData?: IMemberOtherData;

  profileImageUrl?: string;

  creation?: ICreation;

  interview?: IInterview[];
  comment?: string;

  // teamCategory?: ICategory;
  // fullSearch?: string;
  // status?: boolean;
  // assignedImages?: string[];
}

export interface IMemberMainData {
  title?: string;     //
  gender: string;     //
  firstName?: string; //
  lastName?: string;  //
  birthday: string;   //
}

export interface IMemberOtherData {
  info?: string;
}
