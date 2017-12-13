import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [
    'media-center.component.css'
  ]
})

export class MediaCenterComponent implements OnInit {

  @Input() objectId: string;
  @Input() objectType: string;
  @Input() uploaderOptions: any;
  @Input() showUploader: boolean = false;
  @Input() showGalleryForm: boolean = false;
  @Output() notifyParentComponent = new EventEmitter(false);

  // public selectedMediaGallery: IMediaGallery;

  constructor(/* public mediaItemService: MediaItemService,
    public mediaGalleryService: MediaGalleryService */) {
  }

  ngOnInit() {
  }

  toggleUploader() {
    this.showUploader = !this.showUploader;
  }

  toggleGalleryForm() {
    this.showGalleryForm = !this.showGalleryForm;
  }

  uploadCompleted($event) {
    this.notifyParentComponent.emit($event);
    // this.showUploader = false;
  }

  /*
  setMediaGallery(mediaGallery: IMediaGallery) {
    console.log(mediaGallery.title);
    this.selectedMediaGallery = mediaGallery;
  }

  /**********
   *
   * @type {boolean}
   * @private
   */

  public _opened: boolean = false;
  public _modeNum: number = 0;
  public _positionNum: number = 0;
  public _dock: boolean = false;
  public _closeOnClickOutside: boolean = false;
  public _closeOnClickBackdrop: boolean = false;
  public _showBackdrop: boolean = false;
  public _animate: boolean = true;
  public _trapFocus: boolean = true;
  public _autoFocus: boolean = true;
  public _keyClose: boolean = false;
  public _autoCollapseHeight: number = null;
  public _autoCollapseWidth: number = null;

  public _MODES: Array<string> = ['over', 'push', 'slide'];
  public _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  public _toggleOpened(): void {
    this._opened = !this._opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  private _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  public _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  public _onOpened(): void {
    console.info('Sidebar opened');
  }

  public _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  public _onClosed(): void {
    console.info('Sidebar closed');
  }


}
