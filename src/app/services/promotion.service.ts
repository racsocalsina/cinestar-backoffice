import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { formData } from "app/tools/general-functions";

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    constructor(
        public http: HttpClient
    ) { }

    getChocoPromotions(parameters: any) {
        return this.http.get(`${environment.apiUrl}/choco-promotions`, { params: parameters });
    }
    
    getTicketPromotions(parameters: any) {
        return this.http.get(`${environment.apiUrl}/ticket-promotions`, { params: parameters });
    }

    getTicketPromotionParameters() {
        return this.http.get(`${environment.apiUrl}/ticket-promotions/parameters`);
    }

    updateChocoPromotions(id, parameters) {
        return this.http.post(`${environment.apiUrl}/choco-promotions/${id}?_method=PUT`, formData(parameters));
    }

    updateTicketPromotions(id, parameters) {
        return this.http.post(`${environment.apiUrl}/ticket-promotions/${id}?_method=PUT`, formData(parameters));
    }
}