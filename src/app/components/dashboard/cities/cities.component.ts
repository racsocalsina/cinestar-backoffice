import { Component, OnInit } from '@angular/core';
import { CityService } from '@services/city.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormComponent } from '../cities/form/form.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styles: [
  ]
})
export class CitiesComponent implements OnInit {
  cities: any = [];
  constructor(
    private cityService: CityService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  onClickForm() {
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true
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
      text: '¿Estás seguro de eliminar la ciudad?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.cityService.delete(id).subscribe(
            (res) => { this.getCities(); }
          );
        }
      });
  }

  private getCities() {
    this.cityService.getAll().subscribe(
      (res) => { this.cities = res; }
    );
  }
}
