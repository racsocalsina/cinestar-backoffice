import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { SharedService } from '@services/shared.service';
import { emptyValues } from 'app/tools/general-functions';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormComponent } from '../products/form/form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = {};
  currentPage = 1;
  form: FormGroup;
  types: any = []
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
    this.getProducts();
  }

  filter() {
    this.getProducts();
  }

  onClear() {
    this.form.reset();
    this.currentPage = 1;
    this.getProducts();
  }

  onClickEdit(product) {
    const initialState = {
      product
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getProducts();
      }
    });
  }

  onClickViewCinemas(id) {
    this.productService.getHeadquarters(id).subscribe(
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

  pageChanged(e) {
    this.currentPage = e.page;
    this.getProducts();
  }

  getTypes() {
    this.productService.getTypes().subscribe(
      (res: any) => { this.types = res.data });
  }
  
  getProducts() {
    const values = emptyValues(this.form.value);
    this.productService.getAll({ page: this.currentPage, per_page: 20, ...values }).subscribe(
      (res) => { this.products = res });
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, null],
      type_id: [null, null]
    });
  }
}
