import { Component } from '@angular/core';

@Component({
  selector: '[zen-mode-toggle]',
  templateUrl: './zen-mode-toggle.directive.html'
})
export class ZenModeToggleDirective {

  constructor() {
  }

  toggle(){
    console.log('toggle');
  }

}
