import { ICreation } from './creation.interface';
import { ICategory } from './category.interface';
import { ILocationContact } from './location-contact.interface';
import { IAddress } from './address.interface';

export interface ILocation {
  id?: string;
  isImported: boolean;
  title: string;
  text: string;

  assignedCategory?: string | ICategory;
  assignedContacts?: ILocationContact[];

  externalLink?: string;
  imageUrl?: string;

  opening?: string;
  prices?: string;

  creation: ICreation;
  address?: IAddress;
}
