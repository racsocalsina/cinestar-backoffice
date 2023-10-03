import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(
        public http: HttpClient
    ) { }

    getAll(parameters: any) {
        return this.http.get(`${environment.apiUrl}/customers`, { params: parameters });
    }
    
    export() {
        return this.http.get(`${environment.apiUrl}/customers/export`, { responseType: 'blob' });
    }
}