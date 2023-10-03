import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    constructor(
        public http: HttpClient
    ) { }
    
    getAll() {
        return this.http.get(`${environment.apiUrl}/cities`);
    }
    
    create(parameters) {
        return this.http.post(`${environment.apiUrl}/cities`, parameters);
    }
    
    delete(id) {
        return this.http.delete(`${environment.apiUrl}/cities/${id}`);
    }
}