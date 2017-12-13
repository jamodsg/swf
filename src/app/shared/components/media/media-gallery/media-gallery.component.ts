import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html'
})
export class MediaGalleryComponent implements OnInit {

  // @Input() items: IMediaItem[];
  @Input() assignedItem: any;

  @Output() setMediaGallery = new EventEmitter(false);

  constructor(/* public mediaGalleryService: MediaGalleryService,
    public mediaItemService: MediaItemService */) {
  }

  ngOnInit() {
  }

  /*
  removeMediaGallery(gallery: IMediaGallery) {
    console.log(gallery);
  }

  updateMediaItem(item: IMediaItem) {
    this.mediaItemService.updateMediaItem(item.id, item);
  }

  removeMediaItem(item: IMediaItem) {
    this.mediaItemService.removeMediaItem(item);
  }
  */
}
