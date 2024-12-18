//Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from 'src/app/components/authorisation/auth';
import { DatePickerComponent } from 'src/app/components/standalone/date-picker/date-picker.component';
import { DateRangePickerComponent } from 'src/app/components/standalone/date-range-picker/date-range-picker.component';
import { SelectMultiLookupComponent } from 'src/app/components/standalone/select-multi-lookup/select-multi-lookup.component';
import { SelectSingleLookupComponent } from 'src/app/components/standalone/select-single-lookup/select-single-lookup.component';
import { StatusLookupComponent } from 'src/app/components/standalone/status-lookup/status-lookup.component';
import { SidebarComponent } from '../../components/standalone/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { SystemLayoutComponent } from './system.layout.component';

const routes: Routes = [
  {
    path: '',
    component: SystemLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../system/admin/admin.layout.module').then(
            (m) => m.AdminLayoutModule,
          ),
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
  declarations: [SystemLayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarComponent,
    FormsModule,
    ColorPickerModule,
    SelectSingleLookupComponent,
    SelectMultiLookupComponent,
    StatusLookupComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    ToastrModule
  ],
  providers: [AuthGuard],
  exports: [RouterModule, ColorPickerModule],
})
export class SystemLayoutModule { }
