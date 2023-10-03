import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(
        public http: HttpClient
    ) { }   

    getInternalErrors(parameters: any) {
        return this.http.get(`${environment.apiUrl}/logs/internal-errors`, { params: parameters });
    }

    getInternalErrorsParameters() {
        return this.http.get(`${environment.apiUrl}/logs/internal-errors/parameters`);
    }
}