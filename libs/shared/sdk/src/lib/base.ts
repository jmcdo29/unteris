import {
  csrfHeader,
  LoginBody,
  SignupUser,
  PasswordResetRequest,
  PasswordReset,
} from '@unteris/shared/types';
import { method, RouteToType, SdkGeneric } from './routes-with-types';

export class Sdk<T extends SdkGeneric = RouteToType> {
  private csrfToken = '';
  constructor(private readonly baseUrl: string) {}

  setCsrfToken(token: string): typeof this {
    this.csrfToken = token;
    return this;
  }

  private async request<E extends keyof T[method] = keyof T[method]>(config: {
    endpoint: E;
    method: method;
    headers: Record<string, string>;
    body?: T[method][E][1];
  }): Promise<T[method][E][0]> {
    const res = await fetch(`${this.baseUrl}/${config.endpoint.toString()}`, {
      method: config.method.toString().toUpperCase(),
      headers: {
        [csrfHeader]: this.csrfToken,
        'Content-Type': 'application/json',
        ...config.headers,
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(config.body ?? {}),
    });
    if (!res.ok) {
      throw new Error('Error durng request');
    }
    return res.json();
  }

  protected get<E extends keyof T['get']>(
    endpoint: E,
    config: Record<string, string> = {}
  ): Promise<T['get'][E][0]> {
    return this.request({ endpoint, method: 'get', headers: config });
  }

  protected post<E extends keyof T['post']>(
    endpoint: E,
    body: T['post'][E][1],
    config: Record<string, string> = {}
  ): Promise<T['post'][E][0]> {
    return this.request({ endpoint, method: 'post', headers: config, body });
  }

  protected patch<E extends keyof T['patch']>(
    endpoint: E,
    body: T['patch'][E][1],
    config: Record<string, string> = {}
  ): Promise<T['patch'][E][0]> {
    return this.request({ endpoint, method: 'patch', headers: config, body });
  }

  protected put<E extends keyof T['put']>(
    endpoint: E,
    body: T['put'][E][1],
    config: Record<string, string> = {}
  ): Promise<T['put'][E][0]> {
    return this.request({ endpoint, method: 'put', headers: config, body });
  }

  protected delete<E extends keyof T['delete']>(
    endpoint: E,
    body: T['delete'][E][1],
    config: Record<string, string> = {}
  ): Promise<T['delete'][E][0]> {
    return this.request({ endpoint, method: 'delete', headers: config, body });
  }

  async getCsrfToken() {
    return this.get('csrf');
  }

  async getUser() {
    return this.get('auth/me');
  }

  async verifyEmail(token: string) {
    return this.get(`auth/verify-email?verificaitonToken=${token}`);
  }

  async getRaces() {
    return this.get('race');
  }

  async getRaceById(id: string) {
    return this.get(`race/${id}`);
  }

  async getSessionRefresh() {
    return this.get('session/refresh');
  }

  async getDeitiesByCategory(id: string) {
    return this.get(`deities/category/${id}`);
  }

  async getDeitiesByLocation(id: string) {
    return this.get(`deities/location/${id}`);
  }

  async getDeityById(id: string) {
    return this.get(`deities/id/${id}`);
  }

  async getLocations() {
    return this.get('locations');
  }

  async verifyCsrf() {
    return this.post('csrf/verfy', undefined);
  }

  async signup(body: SignupUser) {
    return this.post('auth/signup', body);
  }

  async login(body: LoginBody) {
    return this.post('auth/login', body);
  }

  async logout() {
    return this.post('auth/logout', undefined);
  }

  async passwordResetRequest(body: PasswordResetRequest) {
    return this.post('auth/password-reset-request', body);
  }

  async passwordReset(body: PasswordReset) {
    return this.post('auth/password-reset', body);
  }
}
