import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Trades} from "@tools/enums";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  combo: any;
  form: FormGroup;
  isLoading = false;
  error: string;
  trades = Trades;  
  controls: any = {
    image: null,
    image2: null
  };
  requestFailed: boolean;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private productService: ProductService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.controls.image = this.combo.image;
    this.controls.image2 = this.combo.image2;
  }

  uploadFile(file, trade) {
    this.requestFailed = false;
    if(trade == this.trades.CINESTAR)
    {
      this.form.controls.image.setValue(file);
      this.form.controls.image_r.setValue(null);
    } else {
      this.form.controls.image2.setValue(file);
      this.form.controls.image2_r.setValue(null);
    }                
  }

  onClickSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.productService.update(this.combo.id, this.form.value).subscribe(
        (res) => this.success(),
        (e) => {
          this.requestFailed = true;
          this.failure(e);
        }
      )
    }
  }

  removeImage(trade)
  {
    if(trade == this.trades.CINESTAR){
      this.form.controls.image.setValue(null);
      this.form.controls.image_r.setValue(1);
      this.controls.image = null;
    } else {
      this.form.controls.image2.setValue(null);
      this.form.controls.image2_r.setValue(1);
      this.controls.image2 = null;
    }          
  }

  success() {
    this.isLoading = false;
    this.eventClosed.emit(true);
    this.bsModalRef.hide();
  }
  
  failure(e) {
    this.isLoading = false;
    if(e.error.hasOwnProperty('dev')){
      this.error = e.error.dev;
    }else{
      this.error = "Ocurrio un error, contacte con el administrador"
    }
  }

  private createForm() {
    this.form = this.fb.group({
      image: [null, null],
      image_r: [null, null],
      image2: [null, null],
      image2_r: [null, null],
    })
  }
}
