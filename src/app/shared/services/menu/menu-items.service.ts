import { Injectable } from '@angular/core';
import { IMenuItem } from '../../interfaces/menu/menu-item.interface';
import { MENUITEMS } from '../../config/menu.config';

@Injectable()
export class MenuItemsService {

  getAll(): IMenuItem[] {
    return MENUITEMS;
  }

  add(menu: IMenuItem) {
    MENUITEMS.push(menu);
  }

}
