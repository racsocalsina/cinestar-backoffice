import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(
        public http: HttpClient
    ) { }

    getAll() {
        return this.http.get(`${environment.apiUrl}/movie-formats`);
    }

    create(parameters) {
        return this.http.post(`${environment.apiUrl}/movie-formats`, parameters);
    }

    update(id, parameters) {
        return this.http.put(`${environment.apiUrl}/movie-formats/${id}`, parameters);
    }
    
    updateStatus(id) {
        return this.http.patch(`${environment.apiUrl}/movie-formats/${id}/toggle-status`, {});
    }
    
    delete(id) {
        return this.http.delete(`${environment.apiUrl}/movie-formats/${id}`);
    }
}