import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AwardService } from '@services/award.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {  

  disabled: boolean;
  title: string;
  data: any;
  form: FormGroup;  
  error: string;
  isLoading: boolean;
  action: any;
  actions = {
    create: 0,
    edit: 1,
    view: 2
  }
  requestFailed: boolean;
  public eventClosed: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private awardService: AwardService
  ) {
    this.createForm();    
  }

  ngOnInit(): void {     
    if(this.action == this.actions.edit)    
      this.title = "Editar";
    else 
      this.title = "Ver";    

    this.title += " Datos del Premio";
    this.disabled = this.action == this.actions.view;        

    if (this.data) {     
      this.form.patchValue({        
        description: this.data.description        
      });    

      if(this.disabled)
      {
        this.form.controls['description'].disable();
      }    
    }
  }

  onClickSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.awardService.updateTicketAwards(this.data.id, this.form.value).subscribe(
        (res) => {
          this.isLoading = false;
          this.bsModalRef.hide();
          this.eventClosed.emit(true);
        },
        (e) => {
          this.requestFailed = true;
          this.failure(e);
        }
      )
    }
  }

  uploadFile(file) {
    this.requestFailed = false;
    this.form.controls.image.setValue(file);
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
      description: [null, [Validators.required]],
      image: [null, null]
    });    
  }
  
}
