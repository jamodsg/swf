import { ICreation } from '../../interfaces/creation.interface';
import { Observable } from 'rxjs/Observable';

export class Upload {

  id: string;
  path: string;
  file: File;

  assignedObjects: {
    id: string;
    type: string;
  }[];

  previewImage: string;

  downloadUrl: Observable<string> | string;
  percentage: Observable<number>;
  isActive: boolean;
  snapshot: Observable<any>;

  error: Observable<any>;

  creation: ICreation;

  constructor(file: File) {
    this.file = file;
  }
}
