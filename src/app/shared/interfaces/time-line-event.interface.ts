import { ICreation } from './creation.interface';
import { IArticle } from './article.interface';
import { IMediaItem } from './media-item.interface';

export interface ITimeLineEvent {
  id?: string;
  title: string;
  subTitle?: string;
  text?: string;

  assignedItem: any;        // z.B. Verein
  assignedItemType: string; // z.B. Präsident

  // styling
  icon?: string;
  color?: string;

  assignedMediaItem?: IMediaItem;
  assignedArticle?: IArticle;

  date: any;
  till?: any;

  creation?: ICreation;
}
