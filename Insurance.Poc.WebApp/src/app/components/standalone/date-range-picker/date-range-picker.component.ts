import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AuthenticatedBaseComponent } from '../../base/authenticated_base.component';
import { DateRange } from '../../criteria/Criteria';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd],
})
export class DateRangePickerComponent extends AuthenticatedBaseComponent {
  //Variables

  //Input
  @Input() DateRange: DateRange = new DateRange();
  @Input() Opens: string = 'right'; //left right center
  @Input() Drops: string = 'down';
  @Input() AlwaysShowCalendar: boolean = true;
  @Input() LinkedCalendars: boolean = true;

  @Input() ShowSearch: boolean = false;
  @Input() ShowClear: boolean = false;

  @Input() width: string = 'auto';

  //Output
  @Output() DateChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnSearchClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnClearClick: EventEmitter<any> = new EventEmitter<any>();

  public ranges: any = {
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(30, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().startOf('month').add(1, 'month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().startOf('month')],
    'Last 3 months': [
      moment().startOf('month').subtract(3, 'month').startOf('month'),
      moment().startOf('month'),
    ],
    'Last 6 months': [
      moment().startOf('month').subtract(6, 'month').startOf('month'),
      moment().startOf('month'),
    ],
  };

  locale: any = {
    customRangeLabel: 'Custom range',
    format: 'DD-MM-YYYY',
    cancelLabel: 'Cancel',
  };

  setDateRange(startDate: any, endDate: any) {
    this.DateRange = new DateRange();
    this.DateRange.startDate = moment(startDate);
    this.DateRange.endDate = moment(endDate);
  }

  changeEvent(changeEvent: any) {
    this.DateChangeEvent.emit(this.DateRange);
  }

  searchClick() {
    if (this.OnSearchClick != null) {
      this.OnSearchClick.emit(null);
    }
  }

  clearClick() {
    if (this.OnClearClick != null) {
      this.OnClearClick.emit(null);
    }
  }
}
