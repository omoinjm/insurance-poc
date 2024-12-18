import { Component, OnInit } from '@angular/core';
import { AuthenticatedBaseComponent } from '../../components/base/authenticated_base.component';
// import { _BaseListCriteria } from '../../components/criteria/_base_list_criteria';

@Component({
  selector: 'app-system-layout',
  templateUrl: './system.layout.component.html',
  styleUrls: ['./system.layout.component.scss'],
})
export class SystemLayoutComponent extends AuthenticatedBaseComponent implements OnInit {
  public ShowSideBar: boolean = false;

  public EnableGlobalPager: boolean = false;

  ngOnInit() {
    this.start_subscriptions();
  }

  //Start the relevant subscriptions needed for the system layout to listen in on changes.
  private start_subscriptions() {
    //Subscribe to if the pager should show on the page.
    // this.paging_service.get_global_pager().subscribe((value) => {
    //   this.EnableGlobalPager = value;
    // });
  }
}
