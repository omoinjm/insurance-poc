import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ListCriteria } from '../criteria/_base_list_criteria';
import { ConfigHelper } from '../helpers/config_helper';
import { DeleteResponseModel, ListResponseModel, ResponseModel } from '../models/response_model';

@Injectable()
export class DataService {
  @Output() public Response_Emitter: EventEmitter<any> = new EventEmitter<any>();

  private HTTP_OPTIONS: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private API_URL: string = ConfigHelper.API_URL;

  public constructor(private http: HttpClient) { }

  getListCriteriaHttpParams(criteria: ListCriteria): HttpParams {
    let params = new HttpParams()
      .set('pageIndex', criteria.pageIndex.toString())
      .set('pageSize', criteria.pageSize.toString())
      .set('sort', criteria.sort ?? '')
      .set('sortAscending', criteria.sortAscending?.toString() ?? '')
      .set('search', criteria.search ?? '')
      .set('lookups', criteria.lookups ?? '')
      .set('ranges', criteria.ranges ?? '')
      .set('id', criteria.id ?? '');
    return params;
  }

  //Syncronous get call to which we wait for the call to complete and return a response.
  public async get_list_sync_call(action: string, criteria: ListCriteria) {
    var params = this.getListCriteriaHttpParams(criteria);

    var return_response = new ListResponseModel();

    try {
      this.HTTP_OPTIONS.params = params;

      return_response = Object.assign(
        return_response,
        await this.http.get(this.get_full_api_path(action), this.HTTP_OPTIONS).toPromise(),
      );
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  public async get_lookup_list(params: HttpParams) {
    this.HTTP_OPTIONS.params = params;

    var response: any = await this.http.get(this.get_full_api_path('Lookup/List'), this.HTTP_OPTIONS).toPromise();

    return response;
  }

  public async post_list_sync_call(action: string, criteria: ListCriteria) {
    var params = this.getListCriteriaHttpParams(criteria);

    var return_response = new ListResponseModel();

    try {
      this.HTTP_OPTIONS.params = params;

      return_response = Object.assign(
        return_response,
        await this.http
          .post(this.get_full_api_path(action), JSON.stringify(criteria), this.HTTP_OPTIONS)
          .toPromise(),
      );
    } catch (exception) {
      console.error(exception);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  //Gives the basics to do the get call but needs to be wrapped in the source location, does not wait for this to complete and needs to be subscribed to.
  public async get_async_call(action: string, id: number): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .get(this.get_full_api_path(action) + '/get?id=' + id, this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  // Get call with no params
  public async get_async_call_no_params(action: string): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .get(this.get_full_api_path(action), this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  public async get_sync_call_no_param(action: string): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .get(this.get_full_api_path(action), this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  public async get_sync_call_param(action: string): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .get(this.get_full_api_path(action), this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  //Syncronous post call to which we wait for the call to complete and return a response.
  public async post_sync_call(action: string, payload?: object): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .post<object>(this.get_full_api_path(action), JSON.stringify(payload), this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  //Syncronous put call to which we wait for the call to complete and return a response.
  public async put_sync_call(action: string, payload?: object): Promise<ResponseModel> {
    var return_response = new ResponseModel();

    try {
      const response = await this.http
        .put<object>(this.get_full_api_path(action), JSON.stringify(payload), this.HTTP_OPTIONS)
        .toPromise();

      return_response.data = response;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  //Syncronous post call to which we wait for the call to complete and return a response.
  public async delete_sync_call(action: string, id: number): Promise<DeleteResponseModel> {
    var return_response = new DeleteResponseModel();

    try {
      const response = await this.http
        .delete<object>(this.get_full_api_path(action) + '?id=' + id, this.HTTP_OPTIONS)
        .toPromise();

      return_response.isSuccess = true;
    } catch (exception) {
      console.error(exception);
      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  public async delete_sync_call_param(action: string): Promise<DeleteResponseModel> {
    var return_response = new DeleteResponseModel();

    try {
      const response = await this.http
        .delete<boolean | undefined>(this.get_full_api_path(action), this.HTTP_OPTIONS)
        .toPromise();

      return_response.isSuccess = true;
    } catch (exception) {
      console.error(exception);

      // return_response = await this.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }

  //Handle the exceptions received from the http calls.
  //Add more exception types to this function and it will automatically filter up.
  // private async handle_exception(exception: any, return_response: ListResponseModel) {
  //     return_response.IsException = true;

  //     try {
  //         if (exception.name = "HttpErrorResponse") {
  //             //BadRequest - so we fetch the returned data from the api that is in the BadRequest Object
  //             //We dig into the exception and assign it to our response model. Value = the model being returned from C#
  //             if (exception.status == 400) {
  //                 return_response = Object.assign(return_response, exception.error);
  //             }
  //             //Status 0 when can't communicate with the API, we do a PING to the API just to confirm and send back relevent message.
  //             else if (exception.status == 0) {
  //                 return_response.ErrorList.push(exception.message);
  //                 return_response.ErrorList.push(await this.ping_api_message());
  //             }
  //             else {
  //                 return_response.ErrorList.push("Unknown Http Error");
  //             }
  //         }
  //         //Any other exceptions we just add to the error list
  //         else {
  //             return_response.ErrorList.push(exception.message);
  //         }

  //     }
  //     catch (e: any) {
  //         return_response.ErrorList.push(e.Message);
  //     }

  //     return return_response;
  // }

  //Check if the API is up with a healthcheck.
  private async ping_api_message() {
    console.log('PING');
    try {
      await this.http.get(this.get_full_api_path('auth/ping'), this.HTTP_OPTIONS).toPromise();

      return 'The API is functioning correctly';
    } catch (e) {
      return 'The API is down, a deployment may be in progress';
    }
  }

  //This just builds up the full API path so we don't have to constantly use the base url in everything.
  private get_full_api_path(action: string) {
    return this.API_URL + action;
  }
}
