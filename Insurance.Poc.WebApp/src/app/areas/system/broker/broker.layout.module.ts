//Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import Modules
import { CommonModule } from '@angular/common';

//Components
import { BrokerLayoutComponent } from './broker.layout.component';

// Import Providers
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';
import { DatePickerComponent } from '../../../components/standalone/date-picker/date-picker.component';
import { DateRangePickerComponent } from '../../../components/standalone/date-range-picker/date-range-picker.component';
import { DateTimePickerComponent } from '../../../components/standalone/date-time-picker/date-time-picker.component';
import { PagingComponent } from '../../../components/standalone/pagination/paging.component';
import { SelectMultiLookupComponent } from '../../../components/standalone/select-multi-lookup/select-multi-lookup.component';
import { SelectSingleLookupComponent } from '../../../components/standalone/select-single-lookup/select-single-lookup.component';
import { StatusLookupComponent } from '../../../components/standalone/status-lookup/status-lookup.component';
import { AvatarComponent } from '../../../components/standalone/user/avatar/avatar.component';
import { BrokerSetupComponent } from './setup/broker-setup.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerLayoutComponent,
    children: [
      { path: 'setup', component: BrokerSetupComponent },
      // { path: 'client-policy', component: UserEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    BrokerLayoutComponent,
    // CompanyEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    ColorPickerModule,

    SelectSingleLookupComponent,
    SelectMultiLookupComponent,
    StatusLookupComponent,
    DateRangePickerComponent,
    DateTimePickerComponent,
    DatePickerComponent,
    AvatarComponent,

    PagingComponent,
    ToastrModule,

    BrokerSetupComponent,
  ],
  exports: [RouterModule, ColorPickerModule],
})
export class BrokerLayoutModule {}
