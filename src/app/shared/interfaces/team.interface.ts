// import { IModification } from './modification.interface';
import { ICreation } from './creation.interface';
// import { IPublication } from './publication.interface';
import { ISeason } from './season.interface';
// import { IHighlightedItem } from './highlighted-item.interface';
import { IClub } from './club/club.interface';
import { IMember } from './member/member.interface';
// import { ITraining } from './training.interface';
import { ICategory } from './category.interface';

export interface ITeam {
  id?: string;
  title: string;
  shortTitle?: string;
  subTitle?: string;
  description: string;

  logoURL?: string;
  photoURL?: string;
  photoDescription: string;

  assignedPlayers?: IMember[];
  assignedTeamManagement?: IMember[];
  assignedPositions?: IMember;
  // assignedTrainings?: ITraining[];

  externalTeamLink?: string;

  // teamOfTheMonth?: IHighlightedItem[];

  assignedSeason?: ISeason;
  assignedCategories?: ICategory[];
  assignedClub?: IClub;

  creation: ICreation;
  // publication?: IPublication;
  // modification?: IModification[];
}
