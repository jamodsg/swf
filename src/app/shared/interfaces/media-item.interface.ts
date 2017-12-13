import { ICreation } from './creation.interface';
import { IPublication } from './publication.interface';

export interface IMediaItem {

  id?: string;
  title: string;
  url: string;
  description: string;
  assignedItem: string;
  assignedItemType: string;
  fileSize: number;
  fileType: string;
  fileCredits: string;

  isExternal: boolean;

  creation: ICreation;

  assignedItemGallery?: string;
  publication?: IPublication;

}
