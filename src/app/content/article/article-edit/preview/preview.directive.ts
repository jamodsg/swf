import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[preview]'
})
export class PreviewDirective {

  // @HostBinding() debounce: number;
  @Input() viewSrcMode: boolean = false;

  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    /* if(this.viewSrcMode) {

    } */
  }

  /* refreshPreview(val): any {
    if (this.viewSrcMode) {
      el.text(md.render($rootScope.editor.getSession().getValue()));
      el.wrap('<pre class="preview-src"><code></code></pre>').removeClass('preview-html');
    } else {
      angular.element('.preview-src').replaceWith(el);
      el.html(md.render($rootScope.editor.getSession().getValue())).addClass('preview-html');
    }

    return $rootScope.$emit('preview.updated');
  } */

}
