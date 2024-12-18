import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { AuthenticatedBaseComponent } from '../../base/authenticated_base.component';

@Component({
  selector: 'app-status-lookup',
  templateUrl: './status-lookup.component.html',
  styleUrls: ['./status-lookup.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusLookupComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, ColorPickerModule],
})
export class StatusLookupComponent
  extends AuthenticatedBaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  model: any = { Id: 0 };
  @Input() BindLabel: string = 'Name';
  @Input() BindValue: string = 'Id';
  @Input() ApiMethod: string = '';
  @Input() Name: string = '';

  @Input() clearable: boolean = true;
  @Input() disabled: boolean = false;
  @Input() groupBy?: string;
  @Input() filterId?: string;
  @Input() appendTo: string = 'body';
  @Input() width: string = 'auto';
  @Input() openOnInit: boolean = false;
  @Input() defaultToFirst: boolean = false;
  @Input() enableAdd: boolean = false;
  @Input() PrimaryKeyFieldName?: string;
  @Input() TableName: string = '';

  @Input() Items: any[] = [];
  @Input() lookupTypeId: any;

  val: any;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;
  @ViewChild('newItemDialog') newItemDialog!: TemplateRef<any>;

  @Output() changeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurEmitter: EventEmitter<any> = new EventEmitter<any>();

  public modalDialog!: NgbModalRef;
  newItem: any = {};

  ngOnInit() {
    // Load items if they are not provided
    if (!this.Items) {
      this.loadItems();
    }
  }

  ngAfterViewInit() {
    // Open dropdown if openOnInit is true
    if (this.openOnInit) {
      this.ngSelect.open();
    }
  }

  async loadItems() {
    if (!this.Items) {
      const self = this;

      if (!this.lookupTypeId) {
        let response = await self.post_sync_call('/api/Lookup/' + self.ApiMethod, {});
        this.Items = response.data.Items;

        if (this.defaultToFirst && this.Items.length > 0) {
          this.val = this.Items[0].Id;
        }
      } else {
        let response = await this.get_sync_call('/api/Lookup/GetCustomLookup', this.lookupTypeId);
        this.Items = response.data.Items;

        if (this.defaultToFirst && this.Items.length > 0) {
          this.val = this.Items[0].Id;
        }
      }
    }
  }

  addNewItemButton() {
    if (this.enableAdd) {
      this.Items.push({ Name: 'Add New', Id: -1 });
    }
  }

  async save() {
    const info = { LookupItem: this.newItem, ApiMethod: this.ApiMethod };
    const response = await this.post_sync_call('/api/Lookup/LookupUpsert', info);
    this.Items = response.data.Items;
    this.modalDialog.dismiss();

    // Update value based on the new item added
    for (const item of this.Items) {
      if (item.Name === this.newItem.Name) {
        this.value = item.Id;
        break;
      }
    }
  }

  // ControlValueAccessor implementation
  onChange: (value: any) => void = () => {};
  onTouched: (value: any) => void = () => {};

  get value() {
    return this.val;
  }

  set value(val: any) {
    this.val = val;
    this.onChange(val);
    this.onTouched(val);
  }

  writeValue(newValue: any) {
    this.value = newValue ?? null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onValueChange($event: any) {
    this.onChange(this.val);
    if (this.changeEmitter) {
      this.changeEmitter.emit($event);
    }
  }

  onBlur($event: any) {
    this.blurEmitter.emit($event);
  }

  createNewClick() {
    // Logic to handle new item creation click
  }

  showNewItemDialogClick() {
    this.newItem = {};
    const options: NgbModalOptions = { windowClass: 'modal-standard-height', size: 'large' };
    this.modalDialog = this.ngbModalService.open(this.newItemDialog, options);
    return false;
  }
}
