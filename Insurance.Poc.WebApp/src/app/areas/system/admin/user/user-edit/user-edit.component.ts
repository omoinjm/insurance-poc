import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from 'src/app/components/base/authenticated_base.component';
import { DatePickerComponent } from '../../../../../components/standalone/date-picker/date-picker.component';
import { DateRangePickerComponent } from '../../../../../components/standalone/date-range-picker/date-range-picker.component';
import { DateTimePickerComponent } from '../../../../../components/standalone/date-time-picker/date-time-picker.component';
import { SelectMultiLookupComponent } from '../../../../../components/standalone/select-multi-lookup/select-multi-lookup.component';
import { SelectSingleLookupComponent } from '../../../../../components/standalone/select-single-lookup/select-single-lookup.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SelectSingleLookupComponent,
    SelectMultiLookupComponent,
    DateRangePickerComponent,
    DateTimePickerComponent,
    DatePickerComponent
  ],
})
export class UserEditComponent extends AuthenticatedBaseComponent implements OnInit {

  ngOnInit() {
    this.refresh();
  }

  public async refresh(id: number = this.route.snapshot.params['id']) {
    try {
      var response = await this.get_sync_call('User', id);

      this.ViewModel = response.data;

      console.log({ 'response': response, 'ViewModel': this.ViewModel });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async save() {
    var response = await this.put_sync_call('user/update', this.ViewModel);

    if (response.data) {
      this.toastr.success('User Saved!');
      this.refresh();
    }
  }

  public async deleteUser(id: number = this.route.snapshot.params['id']) {
    try {
      var response = await this.delete_sync_call('User', id);

      console.debug({ 'response': response, 'ViewModel': this.ViewModel });

      this.toastr.success('User Deleted!');

      this.back();
    } catch (e: any) {
      console.error(e);
    }
  }

  back() {
    this.router.navigate(['system/admin/users']);
  }

  async showDialog() {
    // this.UserCompanyCreateComponent.showDialog();
  }

}
