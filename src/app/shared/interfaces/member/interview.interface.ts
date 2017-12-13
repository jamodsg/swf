import { ICreation } from '../creation.interface';

export interface IInterview {
  question: string;
  answer: string;
  assignedMember: string;
  isCommentFromOther: boolean;
  creation: ICreation;
}
