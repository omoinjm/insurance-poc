import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PagingComponent {
  @Output() PagingEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() UpdateCriteriaEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() ListRef: any;

  public PageOptions: number[] = [10, 25, 50, 100];

  // Variables
  @Input() AllCriteria: any;
  @Input() RecordTotal: number = 0;
  @Input() DisableNext: boolean = false;

  next() {
    if (this.DisableNext == false) {
      this.AllCriteria.pageIndex++;
      this.emitPageSubmit();
    } else {
      this.validateNextPage();
    }
  }

  previous() {
    if (this.AllCriteria.pageIndex > 1) {
      this.AllCriteria.pageIndex--;
      this.emitPageSubmit();
    }
  }

  emitPageSubmit() {
    this.PagingEmitter.emit(this.AllCriteria);
    this.UpdateCriteriaEvent.emit(this.AllCriteria);
  }

  OnPageSizeChange() {
    this.emitPageSubmit();
  }

  validateNextPage() {
    if (this.RecordTotal > this.AllCriteria.pageSize * this.AllCriteria.pageIndex) {
      this.AllCriteria.pageIndex++;
      this.emitPageSubmit();
    }
  }
}

export class PageObject {
  pageIndex: number = 1;
  pageSize: number = 50;
}
