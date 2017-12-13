import { IMember } from './member.interface';
import { IArticle } from './article.interface';

export interface IClubHonorary {
  id?: string;
  assignedClub: string;
  assignedArticle: IArticle | string;
  assignedMember: IMember | string;
  since?: string;
}
