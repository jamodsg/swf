import { FilterFunction } from '../../services/media/media-uploader.service';

export interface IUploaderConfig {
  autoUpload?: boolean;
  showDropZone?: boolean;
  multiple?: boolean;
  removeAfterUpload?: boolean;
  showQueue?: boolean;
}

export interface IUploderOptions {
  id?: string;
  path?: string;

  allowedMimeType?: Array<string>;
  allowedFileType?: Array<string>;
  filters?: Array<FilterFunction>;
  maxFileSize?: number;
  queueLimit?: number;
}
