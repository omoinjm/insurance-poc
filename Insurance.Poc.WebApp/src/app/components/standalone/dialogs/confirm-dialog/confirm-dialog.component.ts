import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Input() title?: any;
  @Input() message?: any;

  constructor(public activeModal: NgbActiveModal) {}

  noClick() {
    if (this.onNoClick != null) {
      this.onNoClick();
    }
  }

  yesClick() {
    if (this.onYesClick != null) {
      this.onYesClick();
    }
  }

  public onNoClick?: () => void;
  public onYesClick?: () => void;
}
