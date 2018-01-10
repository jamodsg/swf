import { ICreation } from '../creation.interface';

export interface IMediaItem {

  id: string;
  name: string;

  assignedObjects: {
    id: string;
    type: string;
  }[];

  downloadUrl: string;
  size: number;
  type: string;

  description?: string;
  fileCredits?: string;

  isExternal: boolean;

  creation: ICreation;

  assignedItemGallery?: string;
  // publication?: IPublication;
}
