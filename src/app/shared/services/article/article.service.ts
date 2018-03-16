import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IArticle } from '../../interfaces/article.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { IPublication } from '../../interfaces/publication.interface';
import * as moment from 'moment';

@Injectable()
export class ArticleService {

  private collectionRef: AngularFirestoreCollection<IArticle>;
  private path = `articles`;

  articles$: Observable<IArticle[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collectionRef = this.afs.collection<IArticle>(this.path);
    this.articles$ = this.collectionRef.valueChanges();
  }

  createArticle(article: IArticle): Promise<void> {
    article.id = this.afs.createId();
    return this.afs.collection(this.path).doc(article.id).set(article);
  }

  removeArticle(article: IArticle): Promise<void> {
    return this.afs.collection(this.path).doc(article.id).delete();
  }

  updateArticle(articleId: string, article: IArticle): Promise<any> {
    return this.afs.collection(this.path).doc(articleId).update(article);
  }

  getArticleById(articleId: string): Observable<IArticle> {
    return this.afs.doc<IArticle>(this.path + '/' + articleId).valueChanges();
  }

  setNewArticle(): Observable<IArticle> {
    const publication: IPublication = {
      status: 0,
      date: moment().toISOString(),
      time: '',
      from: this.authService.id
    };
    const article: IArticle = {
      id: this.afs.createId(),
      publication: publication,
      title: '',
      subTitle: '',
      text: '',
      articleDate: moment().toISOString(),
      postURL: '',
      creation: this.authService.getCreation(),
      isFeaturedPost: false
    };
    return Observable.of(article);
  }

}
