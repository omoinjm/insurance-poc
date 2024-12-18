import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../base/authenticated_base.component';
import { AuthenticationHelper } from '../../helpers/authentication_helper';

@Component({
  selector: 'app-sidebar', // Changed to kebab-case with 'app' prefix
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends AuthenticatedBaseComponent implements OnInit {
  public MenuItems: any;

  expandedModuleActive = 'expanded-module-item-active';
  expandedModuleInactive = 'expanded-module-item-inactive';

  public static IsMiniMenu: boolean = false;

  public IsMiniMenu: boolean = false;

  @Output() public OnSidebarChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.get_menu_items();

    if (window.innerWidth < 1500) {
      this.minimize_sidebar();
    }
  }

  private async get_menu_items() {
    var response = await this.get_async_call_no_params('Menu/List');

    this.MenuItems = response.data;

    this.MenuItems.forEach((menuItem: any) => {
      menuItem.moduleSidebarClass = 'expanded-module-item-inactive';

      menuItem.menuList.forEach((item: any) => {
        if (this.router.url.indexOf(item.routerLink) !== -1) {
          menuItem.moduleSidebarClass = 'expanded-module-item-active';
        }
      });
    });
  }

  set_sidebar_children_class(item: any) {
    item.hide = true;

    this.MenuItems.forEach((menuItem: any) => {
      menuItem.moduleSidebarClass = 'expanded-module-item-inactive';
    });

    if (item.moduleSidebarClass === this.expandedModuleActive) {
      item.moduleSidebarClass = this.expandedModuleInactive;
    } else if (item.moduleSidebarClass === this.expandedModuleInactive) {
      item.moduleSidebarClass = this.expandedModuleActive;
    }

    return false;
  }

  minimize_sidebar() {
    this.IsMiniMenu = true;
    SidebarComponent.IsMiniMenu = true;
    var sidebar: any = document.getElementById('sidebar');
    sidebar.classList.remove('sidebar-expanded');
    sidebar.classList.add('sidebar-collapsed');

    this.OnSidebarChange.emit(this.IsMiniMenu);
  }

  maximize_sidebar() {
    this.IsMiniMenu = false;
    SidebarComponent.IsMiniMenu = false;
    var sidebar: any = document.getElementById('sidebar');
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');

    this.OnSidebarChange.emit(this.IsMiniMenu);
  }

  hideItem(item: any) {
    item.hide = true;
  }

  toggleHideItem(item: any) {
    item.hide = !item.hide;
  }

  showItem(item: any) {
    this.MenuItems.forEach(function (menuItem: any) {
      menuItem.hide = true;
    });

    item.hide = false;
  }

  logOut() {
    AuthenticationHelper.clear_user_localstorage();
  }
}
