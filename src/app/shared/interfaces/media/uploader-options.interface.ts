import { FilterFunction } from '../../services/media/media-uploader.service';

export interface IUploderOptions {
  allowedMimeType?: Array<string>;
  allowedFileType?: Array<string>;
  filters?: Array<FilterFunction>;
  id?: string;
  maxFileSize?: number;
  path?: string;
  queueLimit?: number;
  queueSize?: number;
}
