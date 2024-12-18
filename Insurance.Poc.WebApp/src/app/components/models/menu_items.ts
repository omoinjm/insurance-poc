//Model for the navigation with menu items.
export class MenuItemModel {
  public Parent?: MenuItem;
  public CssClass?: string;
  public Children?: Array<MenuItem>;
}

export class MenuItem {
  public Name?: string;
  public Url?: string;
  public IsActive?: boolean;
  public Icon?: string;
  public CssClass?: string;
}
