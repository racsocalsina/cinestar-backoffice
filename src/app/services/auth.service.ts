import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        public http: HttpClient
    ) { }

    login(parameters: any) {
        return this.http.post(`${environment.apiUrl}/auth/login`, parameters);
    }

    getUser() {
        return localStorage.getItem('admin-cinestar')
            ? JSON.parse(atob(localStorage.getItem('admin-cinestar')))
            : null;
    }

    getToken() {
        return localStorage.getItem('admin-cinestar')
            ? JSON.parse(atob(localStorage.getItem('admin-cinestar'))).access_token
            : null;
    }

    isLogged() {
        if (this.getUser()) {
            return true;
        }
        return false;
    }

    deleteUser() {
        localStorage.clear();
    }

}