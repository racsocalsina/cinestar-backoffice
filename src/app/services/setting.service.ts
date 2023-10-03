import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    constructor(
        public http: HttpClient
    ) { }

    getSystemConfiguration() {
        return this.http.get(`${environment.apiUrl}/settings/system-configurations`);
    }

    saveSystemConfiguration(parameters) {
        return this.http.post(`${environment.apiUrl}/settings/system-configurations`, parameters);
    } 
    
    getErpSystemVars() {
        return this.http.get(`${environment.apiUrl}/settings/erp-system-vars`);
    }
}