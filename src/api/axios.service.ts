import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders
} from 'axios';

export const COMMON_API = '/api/v1';

export abstract class AxiosService {
  protected _client;
  protected _interceptor;
  protected _headers: RawAxiosRequestHeaders | AxiosHeaders;

  protected get headers(): AxiosRequestConfig {
    return { headers: this._headers };
  }

  protected set headers(headers: RawAxiosRequestHeaders | AxiosHeaders) {
    this._headers = { ...this._headers, ...headers };
  }

  constructor(baseURL?: string) {
    this._headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    this._client = axios.create({
      baseURL: baseURL ?? COMMON_API,
      headers: this._headers
    });

    this._interceptor = this._client.interceptors.request.use((req) => {
      const token = localStorage.getItem('jwt');

      if (token) {
        this._headers['Authorization'] = `Bearer ${token}`;

        req = {
          ...req,
          headers: {
            ...req.headers,
            Authorization: `Bearer ${token}`
          } as AxiosRequestHeaders
        };
      }

      return req;
    });
  }

  protected _setToken(token: string): void {
    this._headers.Authorization = `Bearer ${token}`;
  }
}
