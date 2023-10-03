import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContentManagementService {

    constructor(public http: HttpClient) { }

    getPartner(parameters: any) {
        return this.http.get(`${environment.apiUrl}/content-managements/partner`, { params: parameters });
    }

    savePartner(parameters) {
        return this.http.post(`${environment.apiUrl}/content-managements/partner?_method=PUT`, parameters);
    }

    getCorporate(parameters: any) {
        return this.http.get(`${environment.apiUrl}/content-managements/corporate`, { params: parameters });
    }

    saveCorporate(parameters) {
        return this.http.post(`${environment.apiUrl}/content-managements/corporate?_method=PUT`, parameters);
    }

    getAbout(parameters: any) {
        return this.http.get(`${environment.apiUrl}/content-managements/about`, { params: parameters });
    }

    saveAbout(parameters) {
        return this.http.post(`${environment.apiUrl}/content-managements/about?_method=PUT`, parameters);
    }

    getTerms(parameters: any) {
        return this.http.get(`${environment.apiUrl}/content-managements/terms`, { params: parameters });
    }

    saveTerms(parameters) {
        return this.http.post(`${environment.apiUrl}/content-managements/terms`, parameters);
    }

    getPopupBanner(parameters: any) {
        return this.http.get(`${environment.apiUrl}/content-managements/popup-banner`, { params: parameters });
    }

    savePopupBanner(parameters) {
        return this.http.post(`${environment.apiUrl}/content-managements/popup-banner?_method=PUT`, parameters);
    }
}
