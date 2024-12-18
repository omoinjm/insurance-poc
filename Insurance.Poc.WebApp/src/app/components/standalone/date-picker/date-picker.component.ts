import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepicker,
  NgbDateStruct,
  NgbModule,
  NgbPopover,
  NgbPopoverConfig,
} from '@ng-bootstrap/ng-bootstrap';
//import { DateTimeModel } from './date-time.model';
import * as moment from 'moment';
import { noop } from 'rxjs';
import { DateModel } from './date.model';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule],
})
export class DatePickerComponent implements OnInit {
  @Input()
  dateString!: string | null;

  @Input() inputDatetimeFormat = 'dd/MM/yyyy';
  @Input() hourStep = 1;
  @Input() minuteStep = 15;
  @Input() secondStep = 30;
  @Input() seconds = true;
  @Input() disabled = false;

  @Input() Disable = false;
  private showTimePickerToggle = false;

  private datetime: DateModel = new DateModel();
  private firstTimeAssign = true;

  @Input() showPickerButton: boolean = true;
  @Input() showClear: boolean = true;
  @Input() alignMiddle: boolean = false;

  @Input() showLeftRightButtons: boolean = false;

  //No longer works.
  //@ViewChild(NgbDatepicker)
  @ViewChild(NgbDatepicker)
  private dp!: NgbDatepicker;

  //No longer works.
  //@ViewChild(NgbPopover)
  @ViewChild(NgbPopover)
  private popover!: NgbPopover;

  @Output() OnChangeEmitter: EventEmitter<any> = new EventEmitter<any>();

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  public ngControl!: NgControl;

  constructor(
    private config: NgbPopoverConfig,
    private inj: Injector,
  ) {
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  // ngAfterViewInit(): void {
  //   //this.popover.hidden.subscribe($event => {
  //   //  this.showTimePickerToggle = false;
  //   //});
  // }

  /*=================================================================
    Debug Handling
    ================================================================*/
  debugEnabled: boolean = false;
  debugLogPage: String = 'date-picker';

  debugLog(obj: any, description: string = '') {
    if (this.debugEnabled == true) {
      console.group(this.debugLogPage + ' - ' + description);
      console.log(obj);
      console.groupEnd();
    }
  }

  writeValue(newModel: string) {
    this.debugLog(newModel);

    if (newModel) {
      this.datetime = Object.assign(this.datetime, DateModel.fromLocalString(newModel));
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateModel();
      this.dateString = '';
    }

    this.debugLog(this.dateString);

    console.groupEnd();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event: any) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateSelect($event: any) {
    console.group('onDateSelect');
    this.debugLog($event);
    this.onDateChange($event);
    console.groupEnd();
  }

  onInputChange($event: any) {
    console.group('onInputChange');

    const value = $event.target.value;
    const dt = DateModel.fromLocalString(value);

    this.debugLog(value);

    if (dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === '') {
      this.datetime = new DateModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.onChange(value);
    }

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit($event);
    }

    console.groupEnd();
  }

  //Removed the ability to use a string because it does not work.
  //onDateChange($event: string | NgbDateStruct) {
  onDateChange($event: NgbDateStruct) {
    console.group('onDateChange');
    this.debugLog($event);
    var eventString: string = '';

    if ($event.year) {
      eventString = `${$event.year}-${$event.month}-${$event.day}`;
      //$event = `${$event.year}-${$event.month}-${$event.day}`
    }

    const date = DateModel.fromLocalString(eventString);

    if (!date) {
      this.dateString = this.dateString;
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    //this.debugLog(this.dp);
    //this.dp.navigateTo({ year: this.datetime.year, month: this.datetime.month });
    //this.debugLog('test');
    this.setDateStringModel();

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit($event);
    }

    console.groupEnd();
  }

  setDateStringModel() {
    console.groupEnd();

    this.dateString = this.datetime.toString();

    this.onChange(this.dateString);

    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      this.debugLog('First time');
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur($event: any) {
    this.onTouched();
  }

  clear($event?: any) {
    this.dateString = '';
    this.onChange(this.dateString);
    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit($event);
    }
  }

  datePrevious() {
    var prev = moment(this.dateString).subtract(1, 'days');
    this.dateString = prev.format('yyyy-MM-DD');
    this.onChange(this.dateString);

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit(this.dateString);
    }
  }

  dateNext() {
    var prev = moment(this.dateString).add(1, 'days');
    this.dateString = prev.format('yyyy-MM-DD');
    this.onChange(this.dateString);

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit(this.dateString);
    }
  }

  dateInputClick(d: any) {
    if (this.Disable == false) {
      d.toggle();
    }
  }

  //clear() {
  //  this.writeValue('');
  //  console.log('clear input');
  //  if (this.valueCommitted) {
  //    this.valueCommitted = false;
  //    this.OnKeyUpEnter.emit();
  //  }
  //  setTimeout(() => {
  //    this.inputElement.nativeElement.focus();
  //  }, 0);
  //}

  //onKeyUpEnter($event) {
  //  console.log('keyup:enter');
  //  this.valueCommitted = true;
  //  this.OnKeyUpEnter.emit($event);
  //  setTimeout(() => {
  //    this.inputElement.nativeElement.focus();
  //  }, 0);
  //}
}
