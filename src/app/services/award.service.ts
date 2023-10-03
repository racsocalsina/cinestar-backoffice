import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { formData } from "app/tools/general-functions";

@Injectable({
    providedIn: 'root'
})
export class AwardService {
    constructor(
        public http: HttpClient
    ) { }

    getChocoAwards(parameters: any) {
        return this.http.get(`${environment.apiUrl}/choco-awards`, { params: parameters });
    }
    
    getTicketAwards(parameters: any) {
        return this.http.get(`${environment.apiUrl}/ticket-awards`, { params: parameters });
    }
    
    updateChocoAwards(id, parameters) {
        return this.http.post(`${environment.apiUrl}/choco-awards/${id}?_method=PUT`, formData(parameters));
    }

    updateTicketAwards(id, parameters) {
        return this.http.post(`${environment.apiUrl}/ticket-awards/${id}?_method=PUT`, formData(parameters));
    }
}