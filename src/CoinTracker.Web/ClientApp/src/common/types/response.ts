export default interface Response<T> {
  json(): unknown;
  items: T;
  succeeded: string;
  errors: string[];
  message: string;
}

export interface PagedResponse<T> {
  items: T[];
  totalPages: number;
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
}
