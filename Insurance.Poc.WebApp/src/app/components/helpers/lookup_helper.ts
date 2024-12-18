import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import moment from "moment";
import { DataService } from "../apiconnector/data.service";
import { DateRange } from "../criteria/Criteria";
import { Lookup, LookupParams } from "../models/lookup";
import { SelectMultiLookupComponent } from "../standalone/select-multi-lookup/select-multi-lookup.component";
import { SelectSingleLookupComponent } from "../standalone/select-single-lookup/select-single-lookup.component";

@Injectable()
export class LookupHelper {
  constructor(
    public data_service: DataService
  ) {

  }

  private async post_sync_call(apiUrl: string, payload?: object) {

    var response = await this.data_service.post_sync_call(apiUrl, payload);

    return response;
  }
  // ====================================================================================
  // Lookup Methods
  // ====================================================================================
  getLookupItemsSynchro(components: SelectSingleLookupComponent[]) {
    components.forEach((component) => {
      this.lookups.push(component.val);
    });
  }

  async getLookupList(lookupParams: LookupParams): Promise<Lookup[]> {
    let params = new HttpParams()
      .set('TableName', lookupParams.LookupTableName.toString() ?? '')
      .set('Id', lookupParams.LookupPrimaryKey.toString() ?? '')
      .set('Name', lookupParams.LookupName.toString() ?? '')
      .set('RecordId', lookupParams.RecordId?.toString() ?? '0');
    //       .set('SelectedIds', encodeURIComponent(JSON.stringify(lookupParams.SelectedIds)) ?? '');

    var response: any = await this.data_service.get_lookup_list(params);

    console.log(response)

    return response.data;
  }



  // ==============================================================================================================================
  // Implementation of Lookup Methods (check for implementation examples on client-user-list, user-edit and notification-list)
  // ==============================================================================================================================

  //MP: CODE CAN BE REFACTORED AS THERE IS COMMON LOGIC

  //MP:saves the state of the lookups list - without ever being overwrriten, except when initialised.
  public lookups: Array<Lookup> = new Array<Lookup>();

  //MP: pushes all the lookup dropdowns from an angular component to an array object (of type Lookup). Identifier = Field name on Primary Table (Main List Table)
  initialiseLookup(listFieldName: string) {
    this.lookups.push({
      name: listFieldName,
      id: 0,
      IdArr: [],
    });
  }

  async onChangeLookup(lookup: Lookup, listFieldName: string): Promise<string> {
    //MP: find item index in the component's lookup list with corresponding field name.
    let index = this.lookups.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      //MP: assign the id to the corresponding lookup record.
      this.lookups[index].id = await lookup?.id;
      //MP: return new encoded json string with the all the lookups on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.lookups));
    } else {
      console.log('Lookup not found in array.');
      return '';
    }
  }

  //MP: a means to populate lookup string parameter, from a multi lookup which controls an int array.
  //MP: there may be a more elegant way to override this change lookup function, but for now I am leaving it here as a separate function as to separate responsibility.
  async onChangeMultiLookup(
    multiLookup: Lookup[],
    listFieldName: string,
  ): Promise<string> {
    //MP: find item index in the component's lookup list with corresponding field name.
    console.log(this.lookups);
    let index = this.lookups.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      //MP: assign the array of id's to the corresponding lookup record.
      this.lookups[index].IdArr = [];
      await multiLookup.forEach((part) => {
        this.lookups[index].IdArr.push(part.id ?? 0);
      });

      //MP: return new encoded json string with the all the lookups on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.lookups));
    } else {
      console.log('Lookup not found in array.');
      return '';
    }
  }


  loadLookups(
    component: SelectSingleLookupComponent
  ) {
    component.loadItems();
  }

  loadMultiLookups(
    component: SelectMultiLookupComponent,
    ids: number[],
  ) {
    component.loadItems();
  }

  // ====================================================================================
  // Date Search Criteria Methods
  // ====================================================================================

  public rangeArr: Array<DateRange> = new Array<DateRange>();

  private setSearchByDateBehaviour(
    range: DateRange = new DateRange(),
    isOnChange: boolean = false,
    isOnClear: boolean = false,
    isRange: boolean = false,
  ): DateRange {
    range.isOnChange = isOnChange;
    range.isOnClear = isOnClear;
    range.isRange = isRange;

    return range;
  }

  private setSearchByDateCriteriaValues(
    oldRange: DateRange = new DateRange(),
    newRange: any,
  ): DateRange {
    console.log('newRange', newRange);
    if (oldRange.isOnClear == false) {
      oldRange.startDate = newRange.startDate ?? moment(newRange);
      oldRange.endDate = newRange.endDate ?? moment(newRange);
    } else {
      oldRange.startDate = null;
      oldRange.endDate = null;
    }
    return oldRange;
  }

  initialiseDateRange(listFieldName: string) {
    this.rangeArr.push({
      name: listFieldName,
      startDate: null,
      endDate: null,
      isOnChange: false,
      isOnClear: false,
      isRange: true,
    });
  }

  async onChangeDateRange(range: any, listFieldName: string): Promise<string> {
    //MP: find item index in the component's lookup list with corresponding field name.
    let index = this.rangeArr.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      this.rangeArr[index] = this.setSearchByDateBehaviour(
        this.rangeArr[index],
        true,
        false,
        true,
      );
      this.rangeArr[index] = this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        range,
      );

      //MP: return new encoded json string with the all the lookups on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log('Range not found in array.');
      return '';
    }
  }

  async onClearDateRange(listFieldName: string): Promise<string> {
    //MP: find item index in the component's range list with corresponding field name.
    let index = this.rangeArr.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      this.rangeArr[index] = await this.setSearchByDateBehaviour(
        this.rangeArr[index],
        false,
        true,
        true,
      );
      this.rangeArr[index] = this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        { startDate: null, endDate: null },
      );

      //MP: return new encoded json string with the all the ranges on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log('Range not found in array.');
      return '';
    }
  }

  initialiseDatePicker(listFieldName: string) {
    console.log('init date picker');
    this.rangeArr.push({
      name: listFieldName,
      startDate: null,
      endDate: null,
      isOnChange: false,
      isOnClear: false,
      isRange: false,
    });
  }

  async onChangeDatePicker(range: any, listFieldName: string): Promise<string> {
    //MP: find item index in the component's range list with corresponding field name.
    let index = this.rangeArr.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      this.rangeArr[index] = await this.setSearchByDateBehaviour(
        this.rangeArr[index],
        true,
        false,
      );
      this.rangeArr[index] = await this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        range,
      );

      //MP: return new encoded json string with the all the ranges on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log('Range not found in array.');
      return '';
    }
  }

  async onClearDatePicker(listFieldName: string): Promise<string> {
    //MP: find item index in the component's ranges list with corresponding field name.
    let index = this.rangeArr.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      this.rangeArr[index] = await this.setSearchByDateBehaviour(
        this.rangeArr[index],
        false,
        true,
      );
      this.rangeArr[index] = await this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        { startDate: null, endDate: null },
      );

      //MP: return new encoded json string with the all the ranges on the component appropriately populated.
      return await encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log('Range not found in array.');
      return '';
    }

  }
}
