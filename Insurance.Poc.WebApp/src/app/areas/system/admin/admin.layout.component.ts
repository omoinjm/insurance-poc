import { Component } from '@angular/core';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin.layout.component.html',
  styleUrls: ['./admin.layout.component.scss'],
})
export class AdminLayoutComponent extends AuthenticatedBaseComponent {}
