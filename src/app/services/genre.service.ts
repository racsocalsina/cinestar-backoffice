import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    constructor(
        public http: HttpClient
    ) { }

    getAll() {
        return this.http.get(`${environment.apiUrl}/movie-genders`);
    }

    create(parameters) {
        return this.http.post(`${environment.apiUrl}/movie-genders`, parameters);
    }

    update(id: string, parameters) {
        return this.http.put(`${environment.apiUrl}/movie-genders/${id}`, parameters);
    }
    
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/movie-genders/${id}`);
    }
}