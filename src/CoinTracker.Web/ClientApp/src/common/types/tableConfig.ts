export interface PagedResponse<T> {
  items: T[];
  totalRecords?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface TableConfig<T> {
  titleTable: string;
  data: PagedResponse<T>;
  isLoading: boolean;
  headers: TableHeader<T>[];
  buttonOptions: ButtonOptions[];
  actions: ActionsMenu<T>[];
  filters: TableHeaderFilter[];
}

export interface ButtonOptions {
  show: boolean;
  type: "export" | "action";
  icon: any;
  text: string;
  handler: () => void;
}

export interface TableHeader<T> {
  key: keyof T;
  name: string;
  hidden?(data: T): boolean;
  format?(data: T): string;
  renderComponent?(rowData: T): JSX.Element;
}

export interface TableHeaderFilter {
  key: number;
  name: string;
  labelName: string;
  startValue: any;
  type: "text" | "date" | "range-date" | "select" | "number" | "enum";
  options?: OptionsSelectFilter[];
}

export interface OptionsSelectFilter {
  label: string;
  value: string;
}

export interface ButtonExportOptions {
  show: boolean;
  type: "export-excel" | "export-pdf";
  handler: () => void;
}

export interface ButtonActionOptions {
  show: boolean;
  icon: any;
  text: string;
  handler: () => void;
}

export interface ActionsMenu<T> {
  icon: any;
  text: string;
  toolTip?: string;
  color?: string;
  hidden?(rowData: T): boolean;
  handler:(rowData: T) => void;
}

export interface OnChangePageEvent {
  pageIndex: number;
  pageSize: number;
}
