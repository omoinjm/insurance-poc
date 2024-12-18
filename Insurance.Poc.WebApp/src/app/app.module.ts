//Angular Imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

//Import Components
import { AppComponent } from './app.component';

//Import Modules
import { BrowserModule } from '@angular/platform-browser';

//Import Providers
import { AuthGuard } from './components/authorisation/auth';
import { DataService } from './components/apiconnector/data.service';
import { ApiInterceptor } from './components/authorisation/api.interceptor';
// import { PagingService } from './components/services/paging_service';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LookupHelper } from './components/helpers/lookup_helper';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'system',
        loadChildren: () =>
          import('./areas/system/system.layout.module').then(
            (m) => m.SystemLayoutModule,
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./areas/login/login.layout.module').then(
            (m) => m.LoginLayoutModule,
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    LookupHelper
    // PagingService
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule,ColorPickerModule],
})
export class AppModule {}
