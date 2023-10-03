import { Component, OnInit } from '@angular/core';
import { CountryService } from '@services/country.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countries: any = [];
  constructor(
    private countryService: CountryService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  onClickForm(value?) {
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState : {
        country: value
      }
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getCities();
      }
    });
  }

  onClickEdit() {
  }

  onClickDelete(id: string) {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de eliminar el país?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.countryService.delete(id).subscribe(
            (res) => { this.getCities(); }
          );
        }
      });
  }

  private getCities() {
    this.countryService.getAll().subscribe(
      (res) => { this.countries = res; }
    );
  }
}
