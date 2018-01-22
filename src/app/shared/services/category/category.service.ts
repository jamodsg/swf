import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICategory } from '../../interfaces/category.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { ICategoryType } from '../../interfaces/category-type.interface';
import { CategoryTypeService } from '../category-type/category-type.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  private collectionRef: AngularFirestoreCollection<ICategory>;
  private path = `categories`;

  categories$: Observable<ICategory[]>;

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private categoryTypeService: CategoryTypeService) {
    this.collectionRef = this.afs.collection<ICategory>(this.path);
    this.categories$ = this.collectionRef.valueChanges();
  }

  createCategory(category: ICategory): Promise<void> {
    category.id = this.afs.createId();
    return this.afs.collection(this.path).doc(category.id).set(category);
  }

  removeCategory(category: ICategory): Promise<void> {
    return this.afs.collection(this.path).doc(category.id).delete();
  }

  updateCategory(categoryId: string, category: ICategory): Promise<any> {
    return this.afs.collection(this.path).doc(categoryId).update(category);
  }

  getCategoryById(categoryId: string): Observable<ICategory> {
    return this.afs.doc<ICategory>(this.path + '/' + categoryId).valueChanges();
  }

  setNewCategory(): ICategory {
    return {
      isImported: false,
      title: '',
      description: ' ',
      assignedCategoryType: '',
      creation: this.authService.getCreation()
    };
  }

  getCategoriesByCategoryType(linkType: string): Observable<ICategory[]>{
    const categoryTypes$ = this.categoryTypeService.categoryTypes$.map((categoryTypes: ICategoryType[]) => {
      return categoryTypes.filter((categoryType: ICategoryType) => {
        return categoryType.link === linkType;
      });
    });

    if(!categoryTypes$) {
      return Observable.throw('No categories found');
    }

    return categoryTypes$.mergeMap((categoryTypes: ICategoryType[]) => {
      return this.categories$.map((categories: ICategory[]) => {
        return categories.filter((category: ICategory) => {
          return category.assignedCategoryType === categoryTypes[0].id;
        });
      });
    });
  }
}
