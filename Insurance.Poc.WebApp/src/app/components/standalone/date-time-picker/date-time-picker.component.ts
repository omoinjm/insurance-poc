import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbDatepicker,
  NgbDateStruct,
  NgbModule,
  NgbPopover,
  NgbPopoverConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { noop } from 'rxjs';
import { DateTimeModel } from './date-time.model';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, ReactiveFormsModule],
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input()
  dateString!: string | null;

  @Input()
  inputDatetimeFormat = 'd/M/yyyy H:mm';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 1;
  @Input()
  secondStep = 30;
  @Input()
  seconds = true;

  @Input()
  disabled = false;

  @Input() showPickerButton: boolean = true;
  @Input() showClear: boolean = true;
  @Input() alignMiddle: boolean = false;

  @Input() showLeftRightButtons: boolean = false;

  @Input() placement: string = 'right';

  private showTimePickerToggle = false;

  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;

  //No longer works.
  //@ViewChild(NgbDatepicker)
  @ViewChild(NgbDatepicker)
  private dp!: NgbDatepicker;

  //No longer works.
  //@ViewChild(NgbPopover)
  @ViewChild(NgbPopover)
  private popover!: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  public ngControl!: NgControl;

  constructor(
    private config: NgbPopoverConfig,
    private inj: Injector,
  ) {
    config.autoClose = 'outside';
    config.placement = this.placement;
  }

  ngOnInit(): void {
    this.config.placement = this.placement;
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.config.placement = this.placement;
    if (this.popover != null) {
      this.popover.hidden.subscribe(($event) => {
        this.showTimePickerToggle = false;
        this.config.placement = this.placement;
      });
    }
  }

  writeValue(newModel: string) {
    if (newModel) {
      this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
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

  onInputChange($event: any) {
    console.debug('onInputChange', $event);
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);

    if (dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === '') {
      this.datetime = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.onChange(value);
    }
  }

  onDateSelect($event: any) {
    console.group('onDateSelect');
    this.onDateChange($event);
    console.groupEnd();
  }

  //Removed the ability to use a string because it does not work.
  //onDateChange($event: string | NgbDateStruct) {
  onDateChange($event: NgbDateStruct) {
    console.debug($event);

    let eventString = '';

    if ($event.year) {
      //eventString = `${$event.year}-${$event.month}-${$event.day}`;

      eventString = `${$event.month}-${$event.day}-${$event.year} ${this.datetime.hour}:${this.datetime.minute}`;

      console.debug('eventString', eventString);

      //$event = `${$event.year}-${$event.month}-${$event.day}`
    }

    const date = DateTimeModel.fromLocalString(eventString);

    console.log('date', date);

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

    //console.log(this.dp);
    //this.dp.navigateTo({ year: this.datetime.year, month: this.datetime.month });
    //console.log('test');
    this.setDateStringModel();
  }

  nowClick(d: any) {
    this.datetime = DateTimeModel.now();
    this.setDateStringModel();
    d.toggle();
  }

  tomorrowClick(d: any) {
    this.datetime = DateTimeModel.now();
    var dt = dayjs().add(1, 'day').toDate();
    this.datetime = DateTimeModel.fromDate(dt);
    this.setDateStringModel();
    d.toggle();
  }

  twoDays(d: any) {
    this.datetime = DateTimeModel.now();
    var dt = dayjs().add(2, 'day').toDate();
    this.datetime = DateTimeModel.fromDate(dt);
    this.setDateStringModel();
    d.toggle();
  }

  oneWeek(d: any) {
    this.datetime = DateTimeModel.now();
    var dt = dayjs().add(1, 'week').toDate();
    this.datetime = DateTimeModel.fromDate(dt);
    this.setDateStringModel();
    d.toggle();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();

    this.onChange(this.dateString);

    //if (!this.firstTimeAssign) {
    //  this.onChange(this.dateString);
    //} else {
    //  // Skip very first assignment to null done by Angular
    //  console.log("First time");
    //  if (this.dateString !== null) {
    //    this.firstTimeAssign = false;
    //  }
    //}
  }

  inputBlur($event: any) {
    this.onTouched();
  }

  dateInputClick(d: any) {
    console.debug('this.datetime', this.datetime);

    if (this.datetime.year == null) {
      this.datetime = DateTimeModel.now();
      this.setDateStringModel();
    }

    d.toggle();
  }

  clear() {}
}
