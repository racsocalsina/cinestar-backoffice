import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { formData } from "app/tools/general-functions";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        public http: HttpClient
    ) { }

    getAll(parameters: any) {
        return this.http.get(`${environment.apiUrl}/products`, { params: parameters });
    }

    update(id, parameters) {
        return this.http.post(`${environment.apiUrl}/products/${id}?_method=PUT`, formData(parameters));
    }
    
    getHeadquarters(id) {
        return this.http.get(`${environment.apiUrl}/products/${id}/headquarters`);
    }

    getCombos(parameters: any) {
        return this.http.get(`${environment.apiUrl}/combos`, { params: parameters });
    }   

    getCombosHeadquarters(id) {
        return this.http.get(`${environment.apiUrl}/combos/${id}/headquarters`);
    }

    getTypes() {
        return this.http.get(`${environment.apiUrl}/masters/product-types`);
    }

    getComboTypes() {
        return this.http.get(`${environment.apiUrl}/masters/combo-types`);
    }
}