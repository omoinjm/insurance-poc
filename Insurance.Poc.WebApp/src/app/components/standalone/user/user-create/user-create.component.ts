import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticatedBaseComponent } from 'src/app/components/base/authenticated_base.component';
import { DateRangePickerComponent } from '../../date-range-picker/date-range-picker.component';
import { DateTimePickerComponent } from '../../date-time-picker/date-time-picker.component';
import { SelectMultiLookupComponent } from '../../select-multi-lookup/select-multi-lookup.component';
import { SelectSingleLookupComponent } from '../../select-single-lookup/select-single-lookup.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SelectSingleLookupComponent,
    SelectMultiLookupComponent,
    DateRangePickerComponent,
    DateTimePickerComponent,
  ],
})
export class UserCreateComponent extends AuthenticatedBaseComponent {
  @ViewChild('UserCreateTemplate') UserCreateTemplate!: TemplateRef<any>;
  public modalDialog!: NgbModalRef;

  @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();
  @Output() OnCancel: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.modalDialog != null) {
      this.modalDialog.close();
    }
  }

  showDialog() {
    let option: NgbModalOptions = { windowClass: 'modal-standard-height', size: 'small' };
    this.modalDialog = this.ngbModalService.open(this.UserCreateTemplate, option);

    this.getUser();
  }

  public async getUser(id: number = 0) {
    try {
      var response = await this.get_sync_call('User', id);

      this.ViewModel = response.data;

      console.debug({ 'response': response, 'ViewModel': this.ViewModel });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async saveUser() {
    try {
      var response = await this.post_sync_call('User/Create', this.ViewModel);

      console.debug({ 'response': response, 'ViewModel': this.ViewModel });

      this.toastr.success('User Created!');

      this.cancelClick();
      this.OnSave.emit();
    } catch (e: any) {
      console.error(e);
    }
  }

  cancelClick() {
    this.modalDialog.close();
  }
}
