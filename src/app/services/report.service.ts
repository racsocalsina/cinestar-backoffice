import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(public http: HttpClient) { }

    getExhibitorMonthly(parameters: any) {
        return this.http.get(`${environment.apiUrl}/reports/exhibitor-monthly`, { params: parameters });
    }

    getQrStatusData(parameters: any) {
        return this.http.get(`${environment.apiUrl}/reports/qr-status`, { params: parameters });
    }
}
