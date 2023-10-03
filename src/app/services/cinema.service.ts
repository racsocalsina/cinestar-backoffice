import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formData } from 'app/tools/general-functions';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CinemaService {
	constructor(public http: HttpClient) {}

	show(id) {
		return this.http.get(`${environment.apiUrl}/headquarters/${id}`);
	}

	search(parameters: any) {
		return this.http.get(`${environment.apiUrl}/headquarters`, {
			params: parameters,
		});
	}

	getParams() {
		return this.http.get(`${environment.apiUrl}/headquarters/parameters`);
	}

	getCinemas(id) {
		return this.http.get(`${environment.apiUrl}/movies/${id}/headquarters`);
	}

	getMovieTimes(id, params) {
		return this.http.get(
			`${environment.apiUrl}/headquarters/${id}/movie-times`,
			{ params: params }
		);
	}

	create(parameters) {
		return this.http.post(
			`${environment.apiUrl}/headquarters`,
			formData(parameters)
		);
	}

	update(id, parameters) {
		return this.http.put(
			`${environment.apiUrl}/headquarters/${id}`,
			parameters
		);
	}

	updateStatus(id) {
		return this.http.patch(
			`${environment.apiUrl}/headquarters/${id}/toggle-status`,
			{}
		);
	}
	updateMovieTime(id, parameters) {
		return this.http.put(`${environment.apiUrl}/movie-times/${id}`, parameters);
	}

    updateMovieTimeStatus(id) {
        return this.http.patch(
            `${environment.apiUrl}/movie-times/${id}/toggle-status`,
            {}
        );
    }

	syncData(id) {
		return this.http.get(`${environment.apiUrl}/headquarters/${id}/sync`);
	}

	addImage(id, parameters) {
		return this.http.post(
			`${environment.apiUrl}/headquarters/${id}/images`,
			formData(parameters)
		);
	}

	updateMainImage(id) {
		return this.http.get(
			`${environment.apiUrl}/headquarter-images/${id}/mark-as-main`
		);
	}

	deleteImage(id) {
		return this.http.delete(`${environment.apiUrl}/headquarter-images/${id}`);
	}
}
