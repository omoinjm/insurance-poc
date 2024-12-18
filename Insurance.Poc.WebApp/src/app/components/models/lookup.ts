export class Lookup {
  id: number | null = null;
  name: string = "";
  //IdList?: string;
  IdArr: number[] = [];
}

export class LookupParams {
  LookupTableName!: string;
  LookupPrimaryKey!: string;
  LookupName!: string;
  RecordId?: number;
  // SelectedIds?: number[];
}
