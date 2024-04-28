import { Update } from "../common/types/create";
import { PagedResponse } from "../common/types/response";
import BaseHttpClient from "../common/axios/base.httpClient";

export default abstract class BaseCrudService<T> {
  controller: string;

  constructor(controller: string) {
    this.controller = controller;
  }

  async getAll(action = "", params?: object) {
    return BaseHttpClient.getAll<T[]>(
      this.controller + action,
      params
    );
  }
  async get(action = "", params?: object) {
    return BaseHttpClient.get<T>(
      this.controller + action,
      params
    );
  }

  async getAllWithPagination(
    action = "",
    skip: number = 1,
    take: number = 10,
    params?: object,
    orderBy?: "asc"
  ) {
    return BaseHttpClient.getAll<PagedResponse<T>>(this.controller + action, {
      skip,
      take,
      orderBy,
      ...params,
    });
  }

  async downloadBlob(body: any[], action = ""): Promise<Blob> {
    return await BaseHttpClient.downloadFile<Blob>(`${this.controller + action}`, body);
  }

  async getById(id: string, params?: object, action = "") {
    return BaseHttpClient.get<T>(`${this.controller}/${id}` + action, params);
  }

  async createWithPartial(body: T) {
    return BaseHttpClient.post<T>(this.controller, body);
  }
  async create(body: T, action = "") {
    return BaseHttpClient.post<T>(this.controller + action, body);
  }

  async update(id: string, body: Update<T>, action = "") {
    return BaseHttpClient.update<T>(
      `${this.controller}${action}${id}`,
      body
    );
  }

  async delete(id: string, action = "") {
    return BaseHttpClient.delete<T>(`${this.controller}/${id}${action}`);
  }

  async patch(id: string, action = "", body: Partial<T> = {}) {
    return BaseHttpClient.patch<T>(
      `${this.controller}${action}${id}`,
      body
    );
  }
}
