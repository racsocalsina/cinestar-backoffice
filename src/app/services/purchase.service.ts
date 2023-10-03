import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    constructor(
        public http: HttpClient
    ) { }

    search(parameters: any) {
        return this.http.get(`${environment.apiUrl}/purchases`, { params: parameters });
    }

    getSearchParameters() {
        return this.http.get(`${environment.apiUrl}/purchases/parameters`);
    }

    completed(id) {
        return this.http.post(`${environment.apiUrl}/purchases/${id}/completed`, {});
    }

    cancelled(id) {
        return this.http.post(`${environment.apiUrl}/purchases/${id}/cancelled`, {});
    }

}
