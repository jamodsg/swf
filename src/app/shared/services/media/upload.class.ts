import { ICreation } from '../../interfaces/creation.interface';
import { Observable } from 'rxjs/Observable';

export class Upload {

  id: string;
  file: File;
  name: string;
  size: number;
  type: string;

  assignedObjectId: string;
  assignedObjectType: string;

  downloadUrl: Observable<string>;
  percentageChanges: Observable<number>;
  error?: Observable<any>;

  creation: ICreation;

  constructor(file: File) {
    this.file = file;
  }
}
