import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-select-multi-lookup', // Updated selector
  templateUrl: './select-multi-lookup.component.html',
  styleUrls: ['./select-multi-lookup.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultiLookupComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class SelectMultiLookupComponent
  extends BaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  model: any = { Id: 0 };
  @Input() BindLabel: string = 'Name';
  @Input() BindValue: string = 'Id';
  @Input() ApiMethod: string = '';
  @Input() Name: string = '';
  @Input() addTag: boolean = false;

  @Input() clearable: boolean = true;

  @Input() disabled: boolean = false;
  @Input() groupBy?: string;
  @Input() filterId?: string;
  @Input() appendTo?: string;

  @Input() width: string = 'auto';

  @Input() openOnInit: boolean = false;

  @Input() showCountsOnly: boolean = false;

  @Input() Items: any[] = [];

  val!: Observable<any[]> | null;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Output() changeEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed
  @Output() blurEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed

  ngOnInit() {
    if (this.Items == null) {
      this.loadItems();
    }
  }

  ngAfterViewInit() {
    if (this.openOnInit) {
      this.ngSelect.open();
    }
  }

  async loadItems() {
    if (this.Items == null) {
      var response = await this.post_sync_call('/api/Lookup/' + this.ApiMethod, {});
      this.Items = response.data.Items;
    }
  }

  onChange: any = (_: any) => {};

  onTouched: any = () => {};

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(newValue: any) {
    if (newValue != null) {
      this.value = newValue;
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onValueChange($event: any) {
    this.onChange(this.val);
    if (this.changeEmitter != null) {
      this.changeEmitter.emit($event);
    }
  }

  onBlur($event: any) {
    this.blurEmitter.emit($event);
  }

  customSearchFn(term: string, item: any) {
    if (term != null) {
      term = term.toLowerCase();
      let found: boolean = false;

      if (item.GroupBy != null) {
        found = item.GroupBy.toLowerCase().indexOf(term) > -1;
      }

      if (!found) {
        found = item.Name.toLowerCase().indexOf(term) > -1;
      }

      return found;
    }

    return false;
  }
}
