import { IMatch } from './match.interface';
import { ILocation } from './location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';
import { ITag } from './tag.interface';
import { ISeason } from './season.interface';
import { ICreation } from './creation.interface';

export interface IArticle {
  id?: string;
  title: string;
  subTitle?: string;
  text: string;
  previewText?: string;
  fullSearch?: string;
  searchWithoutDate?: string;

  matchData?: IMatch;

  articleDate?: Date;

  creation: ICreation;
  // modification?: IModification[];
  // publication?: IPublication;

  assignedCategories?: ICategory[];
  assignedTeams?: ITeam[];
  assignedLocation?: ILocation | '';
  assignedSeason?: ISeason;

  postImage?: string;
  postUrl?: string;

  assignedTags?: ITag[];

  staticPage?: boolean;
  isFeaturedPost?: boolean;
  // isMatch: boolean;

  metaTitle?: string;
  metaDescription?: string;
}
