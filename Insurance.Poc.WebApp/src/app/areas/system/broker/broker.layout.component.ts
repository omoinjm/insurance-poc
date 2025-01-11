import { Component } from '@angular/core';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';

@Component({
  selector: 'app-broker-layout',
  templateUrl: './broker.layout.component.html',
  styleUrls: ['./broker.layout.component.scss'],
})
export class BrokerLayoutComponent extends AuthenticatedBaseComponent {}
