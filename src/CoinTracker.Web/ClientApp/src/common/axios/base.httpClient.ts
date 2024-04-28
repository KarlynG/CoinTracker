import axios, { AxiosRequestConfig } from "axios";
import apiRoute from "../constants/apiRoute";

export default class BaseHttpClient {
  private static familyHeader: { FamilyId: string } | undefined;
  private static formDataHeader: { "Content-Type": "multipart/form-data" };
  static readonly interceptor = axios.create({
    baseURL: apiRoute,
  });

  private static async request<T>(requestConfig: AxiosRequestConfig, formData: boolean = false) {
    const hasFormData = formData ? this.formDataHeader : '';

    return BaseHttpClient.interceptor.request<T>({
      ...requestConfig,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...this.familyHeader,
        ...hasFormData
      },
    });
  }

  static setFamilyHeader(familyId: string | undefined) {
    if (!familyId) {
      this.familyHeader = undefined;
      return;
    }

    this.familyHeader = { FamilyId: `${familyId}` };
  }

  static async get<T>(url: string, params?: object, responseType: | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream' = 'json') {
    return (await this.request<T>({ method: "get", params, url, responseType })).data;
  }

  static async getAll<T>(url: string, params?: object, responseType: | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream' = 'json') {
    return await this.get<T>(url, params, responseType);
  }

  static async downloadFile<T>(url: string, body: any, formData: boolean = false) {
    return (await this.request<T>({ method: "post", data: body, url, responseType: 'blob' }, formData)).data;
  }

  static async post<T>(url: string, body: any, formData: boolean = false) {
    return (await this.request<T>({ method: "post", data: body, url }, formData)).data;
  }

  static async update<T>(url: string, body: any, formData: boolean = false) {
    return (await this.request<T>({ method: "put", data: body, url }, formData)).data;
  }

  static async delete<T>(url: string) {
    return (await this.request<T>({ method: "delete", url })).data;
  }

  static async patch<T>(url: string, body: any) {
    return (await this.request<T>({ method: "patch", data: body, url })).data;
  }
}