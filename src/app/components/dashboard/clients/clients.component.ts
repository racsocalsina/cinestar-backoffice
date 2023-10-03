import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '@services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: any = [];
  currentPage = 1;
  form: FormGroup;
  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.getClients();
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getClients();
  }

  onClickExport() {
    this.clientService.export().subscribe(
      (res: any) => {
        const date = new Date().toISOString();
        var downloadURL = window.URL.createObjectURL(res);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "clientes_"+date+".xlsx";
        link.click();
      }
    );
  }

  public getClients() {
    this.clientService.getAll({ page: this.currentPage }).subscribe(
      (res: any) => {
        this.clients = res;
      }
    );
  }
}
