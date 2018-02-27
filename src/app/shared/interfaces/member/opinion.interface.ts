import { IMember } from './member.interface';

export interface IOpinion {
  comment: string;
  name: string;
  assignedMember: IMember;
}
