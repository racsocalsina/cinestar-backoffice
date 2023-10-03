import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formData } from 'app/tools/general-functions';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FilmService {
    constructor(
        public http: HttpClient
    ) { }

    getAll(parameters: any) {
        return this.http.get(`${environment.apiUrl}/movies`, { params: parameters });
    }

    getParams() {
        return this.http.get(`${environment.apiUrl}/movies/parameters`);
    }

    updateStatus(id) {
        return this.http.patch(`${environment.apiUrl}/movies/${id}/toggle-status`, {});
    }

    update(id, parameters) {
        return this.http.post(`${environment.apiUrl}/movies/${id}?_method=PUT`, formData(parameters));
    }
}