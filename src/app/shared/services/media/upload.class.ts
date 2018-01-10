import { ICreation } from '../../interfaces/creation.interface';
import { Observable } from 'rxjs/Observable';
import { AngularFireUploadTask } from 'angularfire2/storage';

export class Upload {

  id: string;
  file: File;
  name: string;
  size: number;
  type: string;

  assignedObjects: {
    id: string;
    type: string;
  }[];

  downloadUrl: Observable<string>;
  percentageChanges: Observable<number>;
  error?: Observable<any>;

  creation: ICreation;

  isPaused: boolean;
  isCompleted: boolean;

  task: AngularFireUploadTask;

  constructor(file: File) {
    this.file = file;
  }
}
