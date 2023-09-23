import {
	Location,
	LoginBody,
	PasswordReset,
	PasswordResetRequest,
	SignupUser,
	csrfHeader,
} from '@unteris/shared/types';
import { RouteToType, SdkGeneric, method } from './routes-with-types';

export class FetchError extends Error {
	data: Response;
	constructor(message: string, data: Response) {
		super(message);
		this.data = data;
	}
}

abstract class SdkBase<T extends SdkGeneric = RouteToType> {
	private csrfToken = '';
	constructor(private readonly baseUrl: string) {}

	setCsrfToken(token: string): SdkBase<T> {
		this.csrfToken = token;
		return this;
	}

	protected async request<E extends keyof T[method] = keyof T[method]>(config: {
		endpoint: E;
		method: method;
		headers: Record<string, string>;
		body?: T[method][E][1];
	}): Promise<T[method][E][0]> {
		const reqConfig: RequestInit = {
			method: config.method.toString().toUpperCase(),
			headers: {
				[csrfHeader]: this.csrfToken,
				'Content-Type': 'application/json',
				...config.headers,
			},
			credentials: 'include',
			mode: 'cors',
		};
		if (config.method !== 'get') {
			reqConfig.body = JSON.stringify(config.body);
		}
		const res = await fetch(
			`${this.baseUrl}/${config.endpoint.toString()}`,
			reqConfig,
		);
		if (!res.ok) {
			throw new FetchError('Error durng request', res);
		}
		return res.json();
	}

	get<E extends keyof T['get']>(
		endpoint: E,
		config: Record<string, string> = {},
	): Promise<T['get'][E][0]> {
		return this.request({ endpoint, method: 'get', headers: config });
	}

	post<E extends keyof T['post']>(
		endpoint: E,
		body: T['post'][E][1],
		config: Record<string, string> = {},
	): Promise<T['post'][E][0]> {
		return this.request({ endpoint, method: 'post', headers: config, body });
	}

	patch<E extends keyof T['patch']>(
		endpoint: E,
		body: T['patch'][E][1],
		config: Record<string, string> = {},
	): Promise<T['patch'][E][0]> {
		return this.request({ endpoint, method: 'patch', headers: config, body });
	}

	put<E extends keyof T['put']>(
		endpoint: E,
		body: T['put'][E][1],
		config: Record<string, string> = {},
	): Promise<T['put'][E][0]> {
		return this.request({ endpoint, method: 'put', headers: config, body });
	}

	delete<E extends keyof T['delete']>(
		endpoint: E,
		body: T['delete'][E][1],
		config: Record<string, string> = {},
	): Promise<T['delete'][E][0]> {
		return this.request({ endpoint, method: 'delete', headers: config, body });
	}
}

export class Sdk extends SdkBase {
	override async request<
		E extends keyof RouteToType[method] = keyof RouteToType[method],
	>(config: {
		endpoint: E;
		method: method;
		headers: Record<string, string>;
		body?: RouteToType[method][E][1];
	}): Promise<RouteToType[method][E][0]> {
		try {
			return await super.request(config);
		} catch (e) {
			if (e instanceof FetchError) {
				if (e.data.status === 403) {
					const csrf = await this.getCsrfToken();
					this.setCsrfToken(csrf.csrfToken);
					return await this.request(config);
				}
			}
			throw e;
		}
	}

	async getCsrfToken() {
		return this.get('csrf');
	}

	async getUser() {
		return this.get('auth/me');
	}

	async verifyEmail(token: string) {
		return this.get(`auth/verify-email?verificationToken=${token}`);
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

	async getLocationsByType(type: Location['type']) {
		return this.get(`locations?type=${type}`);
	}

	async verifyCsrf() {
		return this.post('csrf/verify', undefined);
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
