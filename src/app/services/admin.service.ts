import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(
        public http: HttpClient
    ) { }

    getAll(parameters: any) {
        return this.http.get(`${environment.apiUrl}/users`, parameters);
    }

    create(parameters: any) {
        return this.http.post(`${environment.apiUrl}/users`, parameters);
    }

    update(id: string, parameters: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, parameters);
    }
    
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
    
    updateStatus(id: string) {
        return this.http.patch(`${environment.apiUrl}/users/${id}/toggle-status`, {});
    }
}