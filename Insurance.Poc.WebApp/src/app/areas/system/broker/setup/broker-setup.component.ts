import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticatedBaseComponent } from 'src/app/components/base/authenticated_base.component';

@Component({
  selector: 'app-broker-setup',
  templateUrl: './broker-setup.component.html',
  styleUrls: ['./broker-setup.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastrModule],
})
export class BrokerSetupComponent extends AuthenticatedBaseComponent implements OnInit {
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {}
}
