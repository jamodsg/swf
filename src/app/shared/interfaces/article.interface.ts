import { IMatch } from './match.interface';
import { ILocation } from './location.interface';
import { ITeam } from './team/team.interface';
import { ICategory } from './category.interface';
import { ITag } from './tag.interface';
import { ISeason } from './season.interface';
import { ICreation } from './creation.interface';
import { IPublication } from './publication.interface';

export interface IArticle {

  id?: string;
  title: string;
  subTitle?: string;

  text: string;


  articleDate?: Date;

  creation: ICreation;
  publication?: IPublication;

  assignedCategories?: ICategory[];
  assignedTags?: ITag[];
  assignedTeams?: ITeam[];
  assignedLocation?: ILocation | '';
  assignedSeason?: ISeason;
  assignedMatch?: IMatch;

  postImage?: string;
  postUrl?: string;

  isFeaturedPost?: boolean;

  metaTitle?: string;
  metaDescription?: string;
}
