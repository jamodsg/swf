import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  // Nav bar demo
  tabLinks = [
    { label: 'Sun', link: 'sunny-tab' },
    { label: 'Rain', link: 'rainy-tab' },
    { label: 'Fog', link: 'foggy-tab' },
  ];

  // Standard tabs demo
  tabs = [
    {
      label: 'Tab 1',
      content: 'This is the body of the first tab'
    }, {
      label: 'Tab 2',
      disabled: true,
      content: 'This is the body of the second tab'
    }, {
      label: 'Tab 3',
      extraContent: true,
      content: 'This is the body of the third tab'
    }, {
      label: 'Tab 4',
      content: 'This is the body of the fourth tab'
    },
  ];

  // Dynamic tabs demo
  activeTabIndex = 0;
  addTabPosition = 0;
  gotoNewTabAfterAdding = false;
  createWithLongContent = false;
  dynamicTabs = [
    {
      label: 'Tab 1',
      content: 'This is the body of the first tab'
    }, {
      label: 'Tab 2',
      disabled: true,
      content: 'This is the body of the second tab'
    }, {
      label: 'Tab 3',
      extraContent: true,
      content: 'This is the body of the third tab'
    }, {
      label: 'Tab 4',
      content: 'This is the body of the fourth tab'
    },
  ];

  asyncTabs: Observable<any>;

  constructor() {
    this.asyncTabs = Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(this.tabs);
      }, 1000);
    });
  }

  addTab(includeExtraContent: boolean): void {
    this.dynamicTabs.splice(this.addTabPosition, 0, {
      label: 'New Tab ' + (this.dynamicTabs.length + 1),
      content: 'New tab contents ' + (this.dynamicTabs.length + 1),
      extraContent: includeExtraContent
    });

    if (this.gotoNewTabAfterAdding) {
      this.activeTabIndex = this.addTabPosition;
    }
  }

  deleteTab(tab: any) {
    this.dynamicTabs.splice(this.dynamicTabs.indexOf(tab), 1);
  }

  swapTabLinks() {
    const temp = this.tabLinks[0];
    this.tabLinks[0] = this.tabLinks[1];
    this.tabLinks[1] = temp;
  }

  addToLabel() {
    this.tabLinks.forEach(link => link.label += 'extracontent');
  }
}
