import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { FacebookService } from '../../../services/facebook/facebook.service';

@Component({
  selector: 'facebook',
  templateUrl: 'facebook.component.html'
})
export class FacebookComponent {

  public posts: Observable<any[]>;

  constructor(public facebookService: FacebookService) {

    this.posts = this.facebookService
      .getPosts('movescalada')
      .map(data => data.map(this.mapPosts));
  }

  mapPosts = (post) => {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      photos: this.getPhotos(post)
    };
  }

  getPhotos = (post) => {
    if (!post.attachments)
      return [];

    let attachments = post.attachments.data[0].subattachments ||
      post.attachments;

    return attachments.data
      .filter(x => x.type == "photo")
      .map(x => x.media.image);
  }

}
