import { Directive, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../apiconnector/data.service';
// import { PagingService } from "../services/paging_service";
import { AuthenticatedBaseComponent } from './authenticated_base.component';
import { ListCriteria } from '../criteria/_base_list_criteria';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LookupHelper } from '../helpers/lookup_helper';

@Injectable()
@Directive()
export class AuthenticatedBaseListComponent extends AuthenticatedBaseComponent {
  public criteria: ListCriteria = ListCriteria.default();

  //Inject the providers imported from app.module
  constructor(
    public override data_service: DataService,
    public override router: Router,
    public override route: ActivatedRoute,
    public override toastr: ToastrService,
    public override ngbModalService: NgbModal,
    public override lookupHelper: LookupHelper,

    // public override paging_service: PagingService
  ) {
    //Call inherited class constructor
    super(
      data_service,
      router,
      route,
      toastr,
      ngbModalService,
      lookupHelper
      // paging_service
    );

    //Show paging html
    // paging_service.set_global_pager(true);
  }
}
