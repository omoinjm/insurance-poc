import { Component } from '@angular/core';
import { AuthenticatedBaseComponent } from 'src/app/components/base/authenticated_base.component';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login.layout.component.html',
  styleUrls: ['./login.layout.component.scss'],
})
export class LoginLayoutComponent extends AuthenticatedBaseComponent {}
