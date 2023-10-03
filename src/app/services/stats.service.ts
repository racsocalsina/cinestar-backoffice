import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(
    public http: HttpClient
  ) {
  }

  geTotalsTickets(parameters: any) {
    return this.http.get(`${environment.apiUrl}/tickets/stats`, {params: parameters});
  }

  geTotalsChoco(parameters: any) {
    return this.http.get(`${environment.apiUrl}/products/stats`, {params: parameters});
  }

  getParameters(parameters: any) {
    return this.http.get(`${environment.apiUrl}/tickets/parameters`, {params: parameters});
  }

  getChocoParameters(parameters: any) {
    return this.http.get(`${environment.apiUrl}/products/parameters`, {params: parameters});
  }

  export() {
    return this.http.get(`${environment.apiUrl}/customers/export`, {responseType: 'blob'});
  }

  getRanking(parameters: any) {
    return this.http.get(`${environment.apiUrl}/customers/ranking`, {params: parameters});
  }
}
