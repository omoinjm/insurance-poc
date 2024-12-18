export class ListResponseModel {
  public pageIndex?: number;
  public pageSize?: number;
  public count?: number;
  public data?: any;

  constructor() {}
}

export class ResponseModel {
  public data?: any;

  constructor() {}
}

export class DeleteResponseModel {
  public isSuccess?: boolean;

  constructor() {}
}

export class ErrorResponseModel {
  public type?: string;
  public title?: string;
  public status?: number;
  public detail?: string;
  public instance?: string;
  public traceID?: string;
  public raw?: string;

  constructor() {}
}
