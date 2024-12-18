import { Component, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticatedBaseComponent } from 'src/app/components/base/authenticated_base.component';
import { Lookup } from '../../../../../components/models/lookup';
import { DateRangePickerComponent } from '../../../../../components/standalone/date-range-picker/date-range-picker.component';
import { DateTimePickerComponent } from '../../../../../components/standalone/date-time-picker/date-time-picker.component';
import { PagingComponent } from '../../../../../components/standalone/pagination/paging.component';
import { SelectMultiLookupComponent } from '../../../../../components/standalone/select-multi-lookup/select-multi-lookup.component';
import { SelectSingleLookupComponent } from '../../../../../components/standalone/select-single-lookup/select-single-lookup.component';
import { AvatarComponent } from '../../../../../components/standalone/user/avatar/avatar.component';
import { UserCreateComponent } from '../../../../../components/standalone/user/user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SelectSingleLookupComponent,
    SelectMultiLookupComponent,
    DateRangePickerComponent,
    DateTimePickerComponent,
    UserCreateComponent,
    AvatarComponent,
    PagingComponent,
    ToastrModule,
  ],
})
export class UserListComponent extends AuthenticatedBaseComponent implements OnInit {
  @ViewChild('UserCreateComponent') UserCreateComponent!: UserCreateComponent;
  @ViewChild('Pager') Pager!: PagingComponent;

  ngOnInit(): void {
    this.lookupHelper.lookups = new Array<Lookup>();
    this.getUserList();
  }

  public async getUserList() {
    try {
      var response = await this.get_list_sync_call('User/List', this.Criteria);

      this.ViewModel = response;

      console.log({ 'response': response, 'ViewModel': this.ViewModel });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async refresh(paging: any = null) {
    if (paging != null) {
      this.Criteria.pageIndex = paging.pageIndex;
      this.Criteria.pageSize = paging.pageSize;
    }

    this.getUserList();
  }

  public async searchUserList() {
    this.getUserList();
  }

  public async deleteUser(id: number) {
    try {
      var response = await this.delete_sync_call('User/Delete', id);

      console.log(response);
    } catch (e: any) {
      console.error(e);
    }
  }

  edit(id: number) {
    this.router.navigate(['system/admin/users', id]);
  }

  createUser() {
    this.UserCreateComponent.showDialog();
  }

  initialiseLookup(listFieldName: string) {
    this.lookupHelper.initialiseLookup(listFieldName);
  }

  async onChangeLookup(lookup: Lookup, listFieldName: string) {
    this.Criteria.lookups = await this.lookupHelper.onChangeLookup(lookup, listFieldName);
    this.refresh();
  }

  async onChangeMultiLookup(multiLookup: Lookup[], listFieldName: string) {
    this.Criteria.lookups = await this.lookupHelper.onChangeMultiLookup(multiLookup, listFieldName);
    this.refresh();
  }
}
