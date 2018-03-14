import { Component, ElementRef } from '@angular/core';

@Component({
  selector: '[zen-mode]',
  templateUrl: './zen-mode.directive.html'
})
export class ZenModeDirective {

  private isZen: boolean = false;
  private zen: any;
  private element: ElementRef;

  constructor(private el: ElementRef) {
    this.element = el;
  }

  close() {
    this.isZen = !this.isZen;
    // documentsService.setCurrentDocumentBody(this.zen.getSession().getValue());
    // $rootScope.$emit('document.refresh');
    this.element.nativeElement.destroy();
    return false;
  }

  toggle() {
    this.isZen = !this.isZen;

    if (this.isZen) {
      /* scope = $rootScope.$new();
       el    = $compile(template)(scope);

      angular.element(document.body).append(el);

      require('brace/mode/markdown');
      require('../documents/theme-dillinger');

       this.zen = ace.edit('zen');
      this.zen.getSession().setMode('ace/mode/markdown');
      this.zen.setTheme('ace/theme/dillinger');
      this.zen.getSession().setUseWrapMode(true);
      this.zen.renderer.setShowGutter(false);
      this.zen.setShowPrintMargin(false);
      this.zen.getSession().setValue(documentsService.getCurrentDocumentBody());
      */
      this.element.nativeElement.addClass('on');
    }
    return false;
  }

}
