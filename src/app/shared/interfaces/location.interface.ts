import { ICreation } from './creation.interface';
import { ICategory } from './category.interface';
import { ILocationContact } from './location-contact.interface';
import { IMediaGallery } from './media/media-gallery.interface';
import { IAddress } from './address.interface';
import { IPublication } from './publication.interface';

export interface ILocation {
  id?: string;
  isImported: boolean;
  title: string;
  text: string;
  assignedCategory?: string | ICategory;

  assignedContacts?: ILocationContact[];

  // assignedImages: string[];
  // assignedMediaGalleries: IMediaGallery[];
  externalLink?: string;
  imageUrl?: string;

  opening?: string;
  prices?: string;

  creation: ICreation;
  // modification?: IModification[];
  publication?: IPublication;

  address?: IAddress;
}
