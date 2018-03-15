import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as screenfull from "screenfull";
import { MatDialog } from '@angular/material';
import { MarkdownHelpComponent } from './markdown-help/markdown-help.component';
import { CountmeService } from 'ngx-countme';

@Component({
  selector: 'article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  public article: IArticle;
  public enableWordsCount: boolean = true;
  public enableCharactersCount: boolean = true;
  public viewSrcMode: boolean;

  public words: number = 0;
  public characters: number = 0;

  public form: FormGroup;
  public sf: any;

  public options: any = {
    maxLines: 90000,
    printMargin: false
  };

  public publicationOptions: any[] = [
    {
      text: 'Set it live now',
      description: 'Publish this post immediately',
      value: 0
    },
    {
      text: 'Schedule it for later',
      description: 'Set automatic future publish date',
      value: 1
    }
  ];

  public text: string = '# Dillinger\n' +
    '\n' +
    '[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n' +
    '\n' +
    'Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\n' +
    '\n' +
    '  - Type some Markdown on the left\n' +
    '  - See HTML in the right\n' +
    '  - Magic\n' +
    '\n' +
    '# New Features!\n' +
    '\n' +
    '  - Import a HTML file and watch it magically convert to Markdown\n' +
    '  - Drag and drop images (requires your Dropbox account be linked)\n' +
    '\n' +
    '\n' +
    'You can also:\n' +
    '  - Import and save files from GitHub, Dropbox, Google Drive and One Drive\n' +
    '  - Drag and drop markdown and HTML files into Dillinger\n' +
    '  - Export documents as Markdown, HTML and PDF\n' +
    '\n' +
    'Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]\n' +
    '\n' +
    '> The overriding design goal for Markdown\'s\n' +
    '> formatting syntax is to make it as readable\n' +
    '> as possible. The idea is that a\n' +
    '> Markdown-formatted document should be\n' +
    '> publishable as-is, as plain text, without\n' +
    '> looking like it\'s been marked up with tags\n' +
    '> or formatting instructions.\n' +
    '\n' +
    'This text you see here is *actually* written in Markdown! To get a feel for Markdown\'s syntax, type some text into the left window and watch the results in the right.\n' +
    '\n' +
    '### Tech\n' +
    '\n' +
    'Dillinger uses a number of open source projects to work properly:\n' +
    '\n' +
    '* [AngularJS] - HTML enhanced for web apps!\n' +
    '* [Ace Editor] - awesome web-based text editor\n' +
    '* [markdown-it] - Markdown parser done right. Fast and easy to extend.\n' +
    '* [Twitter Bootstrap] - great UI boilerplate for modern web apps\n' +
    '* [node.js] - evented I/O for the backend\n' +
    '* [Express] - fast node.js network app framework [@tjholowaychuk]\n' +
    '* [Gulp] - the streaming build system\n' +
    '* [Breakdance](http://breakdance.io) - HTML to Markdown converter\n' +
    '* [jQuery] - duh\n' +
    '\n' +
    'And of course Dillinger itself is open source with a [public repository][dill]\n' +
    ' on GitHub.\n' +
    '\n' +
    '### Installation\n' +
    '\n' +
    'Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n' +
    '\n' +
    'Install the dependencies and devDependencies and start the server.\n' +
    '\n' +
    '```sh\n' +
    '$ cd dillinger\n' +
    '$ npm install -d\n' +
    '$ node app\n' +
    '```\n' +
    '\n' +
    'For production environments...\n' +
    '\n' +
    '```sh\n' +
    '$ npm install --production\n' +
    '$ NODE_ENV=production node app\n' +
    '```\n' +
    '\n' +
    '### Plugins\n' +
    '\n' +
    'Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.\n' +
    '\n' +
    '| Plugin | README |\n' +
    '| ------ | ------ |\n' +
    '| Dropbox | [plugins/dropbox/README.md][PlDb] |\n' +
    '| Github | [plugins/github/README.md][PlGh] |\n' +
    '| Google Drive | [plugins/googledrive/README.md][PlGd] |\n' +
    '| OneDrive | [plugins/onedrive/README.md][PlOd] |\n' +
    '| Medium | [plugins/medium/README.md][PlMe] |\n' +
    '| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |\n' +
    '\n' +
    '\n' +
    '### Development\n' +
    '\n' +
    'Want to contribute? Great!\n' +
    '\n' +
    'Dillinger uses Gulp + Webpack for fast developing.\n' +
    'Make a change in your file and instantanously see your updates!\n' +
    '\n' +
    'Open your favorite Terminal and run these commands.\n' +
    '\n' +
    'First Tab:\n' +
    '```sh\n' +
    '$ node app\n' +
    '```\n' +
    '\n' +
    'Second Tab:\n' +
    '```sh\n' +
    '$ gulp watch\n' +
    '```\n' +
    '\n' +
    '(optional) Third:\n' +
    '```sh\n' +
    '$ karma test\n' +
    '```\n' +
    '#### Building for source\n' +
    'For production release:\n' +
    '```sh\n' +
    '$ gulp build --prod\n' +
    '```\n' +
    'Generating pre-built zip archives for distribution:\n' +
    '```sh\n' +
    '$ gulp build dist --prod\n' +
    '```\n' +
    '### Docker\n' +
    'Dillinger is very easy to install and deploy in a Docker container.\n' +
    '\n' +
    'By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.\n' +
    '\n' +
    '```sh\n' +
    'cd dillinger\n' +
    'docker build -t joemccann/dillinger:${package.json.version}\n' +
    '```\n' +
    'This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.\n' +
    '\n' +
    'Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):\n' +
    '\n' +
    '```sh\n' +
    'docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}\n' +
    '```\n' +
    '\n' +
    'Verify the deployment by navigating to your server address in your preferred browser.\n' +
    '\n' +
    '```sh\n' +
    '127.0.0.1:8000\n' +
    '```\n' +
    '\n' +
    '#### Kubernetes + Google Cloud\n' +
    '\n' +
    'See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)\n' +
    '\n' +
    '\n' +
    '### Todos\n' +
    '\n' +
    ' - Write MORE Tests\n' +
    ' - Add Night Mode\n' +
    '\n' +
    'License\n' +
    '----\n' +
    '\n' +
    'MIT\n' +
    '\n' +
    '\n' +
    '**Free Software, Hell Yeah!**\n' +
    '\n' +
    '[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn\'t be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)\n' +
    '\n' +
    '\n' +
    '   [dill]: <https://github.com/joemccann/dillinger>\n' +
    '   [git-repo-url]: <https://github.com/joemccann/dillinger.git>\n' +
    '   [john gruber]: <http://daringfireball.net>\n' +
    '   [df1]: <http://daringfireball.net/projects/markdown/>\n' +
    '   [markdown-it]: <https://github.com/markdown-it/markdown-it>\n' +
    '   [Ace Editor]: <http://ace.ajax.org>\n' +
    '   [node.js]: <http://nodejs.org>\n' +
    '   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>\n' +
    '   [jQuery]: <http://jquery.com>\n' +
    '   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>\n' +
    '   [express]: <http://expressjs.com>\n' +
    '   [AngularJS]: <http://angularjs.org>\n' +
    '   [Gulp]: <http://gulpjs.com>\n' +
    '\n' +
    '   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>\n' +
    '   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>\n' +
    '   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>\n' +
    '   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>\n' +
    '   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>\n' +
    '   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>\n';

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private fb: FormBuilder) {
    this.sf = screenfull;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { article: IArticle }) => {
      this.article = data.article;
    });

    this.form = this.fb.group({
      title: [this.article ? this.article.title : 'Testing', [Validators.required, Validators.minLength(10)]],
      text: [/*this.article ? this.article.text :*/ this.text, [Validators.required, Validators.minLength(10)]],
      publication: this.article ? this.article.publication : this.publicationOptions[0]
    });

    this.viewSrcMode = false;
  }

  fullScreenToggle() {
    screenfull.toggle();
  }

  toggleView() {
    this.viewSrcMode = !this.viewSrcMode;
  }

  updateDocument() {
    console.log('update doc');
  }

  openMarkdownHelp(): void {
    this.dialog.open(MarkdownHelpComponent);
  }

}
