import { HttpParams } from '@angular/common/http';
import { Directive, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../apiconnector/data.service';
import { ListCriteria } from '../criteria/_base_list_criteria';
import { AuthenticationHelper } from '../helpers/authentication_helper';
import { LookupHelper } from '../helpers/lookup_helper';
import { LoginResultModel } from '../models/login_result';
import { ConfirmDialogComponent } from '../standalone/dialogs/confirm-dialog/confirm-dialog.component';
// import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
@Directive()
export class BaseComponent {
  public LoggedInUser: LoginResultModel;
  public IsLoading: boolean = false;
  public ViewModel: any;
  public Criteria: ListCriteria = ListCriteria.default();

  //Get user detail every load and just blank populate the viewmodel
  constructor(
    public data_service: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    public ngbModalService: NgbModal,
    public lookupHelper: LookupHelper,
    // public eRef: ElementRef,
    // public sanitizer: DomSanitizer,
  ) {
    this.LoggedInUser = AuthenticationHelper.get_user_detail();
    this.ViewModel = Object.assign(new Object());
  }

  //New posting method that uses a more synchronous way of getting the data
  //This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async get_list_sync_call(apiUrl: string, criteria: ListCriteria) {
    this.IsLoading = true;

    var response = await this.data_service.get_list_sync_call(apiUrl, criteria);

    this.IsLoading = false;

    return response;
  }

  // Lookup
  public async get_lookup_list(params: HttpParams) {
    this.IsLoading = true;

    var response = await this.data_service.get_lookup_list(params);

    this.IsLoading = false;

    return response;
  }

  public async post_list_sync_call(apiUrl: string, criteria: ListCriteria) {
    this.IsLoading = true;

    var response = await this.data_service.post_list_sync_call(apiUrl, criteria);

    this.IsLoading = false;

    return response;
  }

  //New posting method that uses a more synchronous way of getting the data
  //This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async post_sync_call(apiUrl: string, payload?: object) {
    this.IsLoading = true;

    var response = await this.data_service.post_sync_call(apiUrl, payload);

    this.IsLoading = false;

    return response;
  }

  public async put_sync_call(apiUrl: string, payload?: object) {
    this.IsLoading = true;

    var response = await this.data_service.put_sync_call(apiUrl, payload);

    this.IsLoading = false;

    return response;
  }

  //New posting method that uses a more synchronous way of getting the data
  //This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async get_sync_call(apiUrl: string, id: number) {
    this.IsLoading = true;

    var response = await this.data_service.get_async_call(apiUrl, id);

    this.IsLoading = false;

    return response;
  }

  // Get call with no params
  public async get_async_call_no_params(apiUrl: string) {
    this.IsLoading = true;

    var response = await this.data_service.get_async_call_no_params(apiUrl);

    this.IsLoading = false;

    return response;
  }

  public async get_sync_call_no_param(apiUrl: string) {
    this.IsLoading = true;

    var response = await this.data_service.get_sync_call_no_param(apiUrl);

    this.IsLoading = false;

    return response;
  }

  //MP:concatenate http get params before calling this function.
  public async get_sync_call_param(apiUrl: string) {
    this.IsLoading = true;

    var response = await this.data_service.get_sync_call_param(apiUrl);

    this.IsLoading = false;

    return response;
  }

  //New delete method that uses a more synchronous way of removing the data
  public async delete_sync_call(apiUrl: string, id: number) {
    this.IsLoading = true;

    var response = await this.data_service.delete_sync_call(apiUrl, id);

    this.IsLoading = false;

    return response;
  }

  public async delete_sync_call_param(apiUrl: string) {
    this.IsLoading = true;

    var response = await this.data_service.delete_sync_call_param(apiUrl);

    this.IsLoading = false;

    return response;
  }

  focusElementById(id: any) {
    var el = document.getElementById(id);

    if (el == null) console.log('Cannot find element with ID ' + id);
    else {
      el.focus();
    }
  }

  /*=================================================================
  Dialogs
  ================================================================*/

  public showYesNoDialog(
    title: String,
    message: String,
    yesCallBack: () => void,
    noCallback: () => void,
  ) {
    const modalRef = this.ngbModalService.open(ConfirmDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.onYesClick = yesCallBack;
    modalRef.componentInstance.onNoClick = noCallback;
  }

  public formatDate(value: any): string | null {
    if (!value) return null;

    const date = new Date(value);

    return date.toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
  }
}
