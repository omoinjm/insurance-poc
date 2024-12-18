import { Component } from '@angular/core';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends AuthenticatedBaseComponent {}
