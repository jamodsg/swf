import { ICreation } from './creation.interface';
import { ICategory } from './category.interface';
import { ILocationContact } from './location-contact.interface';
import { IMediaGallery } from './media-gallery.interface';
import { IAddress } from './address.interface';

export interface ILocation {
  id?: string;
  isImported: false;
  title: string;
  text: string;
  assignedCategory?: string | ICategory;

  assignedContacts?: ILocationContact[];
  /*[{
    isMember: boolean;
    memberId?: string;
    description: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
  }]; */

  assignedImages: string[];
  assignedMediaGalleries: IMediaGallery[];
  externalLink?: string;
  imageUrl?: string;

  opening?: string;
  prices?: string;

  creation: ICreation;
  // modification?: IModification[];
  // publication?: IPublication;

  address?: IAddress;
}
