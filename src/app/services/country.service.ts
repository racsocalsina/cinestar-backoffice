import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor(
        public http: HttpClient
    ) { }
    
    getAll() {
        return this.http.get(`${environment.apiUrl}/countries`);
    }
    
    create(parameters) {
        return this.http.post(`${environment.apiUrl}/countries`, parameters);
    }
    
    update(id, parameters) {
        return this.http.put(`${environment.apiUrl}/countries/${id}`, parameters);
    }
    
    delete(id) {
        return this.http.delete(`${environment.apiUrl}/countries/${id}`);
    }
}