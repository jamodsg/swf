import { ICreation } from '../../interfaces/creation.interface';
import { Observable } from 'rxjs/Observable';

export class Upload {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  downloadUrl: Observable<string>;
  percentageChanges: Observable<number>;
  creation: ICreation;
  error?: Observable<any>;

  constructor(file: File) {
    this.file = file;
  }
}
