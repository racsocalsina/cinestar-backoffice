import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Actions, PurchaseStatus } from '@tools/enums';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {  
  
  title: string;
  data: any;
  form: FormGroup;    
  actions = Actions
  purchaseStatus = PurchaseStatus;  
  public eventClosed: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,    
  ) {
    this.createForm();    
  }

  ngOnInit(): void {         
    this.title = " Datos de la Compra";         
  }

  private createForm() {
    this.form = this.fb.group({         
    });    
  }
  
}
