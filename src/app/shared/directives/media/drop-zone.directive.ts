import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {

  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    let transfer = $event.dataTransfer;
    this.filesDropped.emit(transfer.files);
    this.filesHovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    console.log($event);
    event.preventDefault();
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    console.log($event);
    this.filesHovered.emit(false);
  }
}
