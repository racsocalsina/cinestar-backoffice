import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { SharedService } from '@services/shared.service';
import { emptyValues } from 'app/tools/general-functions';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {
  currentPage = 1;
  combos: any = {};
  form: FormGroup;
  types = [];
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    public sharedService: SharedService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.getTypes();
    this.getCombos();
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getCombos();
  }

  filter() {
    this.currentPage = 1;
    this.getCombos();
  }

  onClear() {
    this.form.reset();
    this.currentPage = 1;
    this.getCombos();
  }

  onClickEdit(combo) {
    const initialState = {
      combo
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getCombos();
      }
    });
  }

  onClickViewCinemas(id) {
    this.productService.getCombosHeadquarters(id).subscribe(
      (res: any) => {
        let cinemas = '';
        res.data.map((cinema) => {
          cinemas+= '<li>'+cinema.name+'</li>';
        });
        Swal.fire({
          title: '<h4>Lista de cines disponibles</h4>',
          html: cinemas 
        });
      });
  }
  
  getTypes() {
    this.productService.getComboTypes().subscribe(
      (res:any) => { this.types = res.data });
  }

  getCombos() {
    const values = emptyValues(this.form.value);
    this.productService.getCombos({ page: this.currentPage, per_page: 20, ...values }).subscribe(
      (res) => { this.combos = res });
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, null],
      type_id: [null, null]
    })
  }
}
