import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formData } from 'app/tools/general-functions';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BannerService {
	constructor(public http: HttpClient) {}

	search(parameters: any) {
		return this.http.get(`${environment.apiUrl}/banners`, {
			params: parameters,
		});
	}

	create(parameters) {
		return this.http.post(
			`${environment.apiUrl}/banners`,
			formData(parameters)
		);
	}

	update(id, parameters) {
		return this.http.post(
			`${environment.apiUrl}/banners/update/${id}`,
			formData(parameters)
		);
	}

	delete(id) {
		return this.http.delete(`${environment.apiUrl}/banners/${id}`);
	}
}
