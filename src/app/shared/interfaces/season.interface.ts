import { ICreation } from './creation.interface';
// import { IModification } from './modification.interface';
// import { IPublication } from './publication.interface';

export interface ISeason {

  id?: string;
  $exists?: string;

  title: string;
  description: string;

  creation: ICreation;
  // modification?: IModification;
  // publication?: IPublication;
}
