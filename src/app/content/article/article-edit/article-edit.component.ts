import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  public article: IArticle;
  public enableWordsCount: boolean = true;
  public enableCharactersCount: boolean = true;

  public viewSrcMode: boolean = false;

  public words: number = 0;
  public characters: number = 0;

  public form: FormGroup;

  public options:any = {
    maxLines: 90000,
    printMargin: false
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.form = this.fb.group({
      title: [ this.article ? this.article.title : 'Testing', [Validators.required, Validators.minLength(10)]],
      text: [ this.article ? this.article.text : 'Taasdasdasdasdasdasdasdasdg', [Validators.required, Validators.minLength(10)]],
    });
  }

  toggleView() {
    console.log('test');
    console.log(this.viewSrcMode);
    this.viewSrcMode = !this.viewSrcMode;
  }

  toggle() {
    console.log('toggle zenView');
  }

  updateDocument(){
    console.log('update doc');
  }

  onChange(code) {
    console.log("new code", code);
  }

}
