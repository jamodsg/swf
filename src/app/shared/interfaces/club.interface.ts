import { ICreation } from './creation.interface';
import { IAddress } from './address.interface';
import { ITimeLineEvent } from './time-line-event.interface';
import { IClubManagement } from './club-management.interface';
import { IClubHonorary } from './club-honorary.interface';

export interface IClub {
  id?: string;

  title: string;
  description?: string;
  history?: string;
  logoUrl?: string;
  address?: IAddress;

  fussballde: {
    clubId?: string;
    clubUrl?: string;
  };

  assignedFiles: any; // IMediaItem[];
  assignedLocation: string;
  assignedClubEvents: ITimeLineEvent[];

  info: {
    founding?: string;
    clubColours?: string;
    contact?: string;
    website?: string;
  };

  honoraries: IClubHonorary[];

  management: {
    positions: IClubManagement[];
    photoUrl?: string;
    photoDescription?: string;
    assignedManagementEvents: ITimeLineEvent[];
  };

  creation: ICreation;
  // modification?: IModification[];
}
