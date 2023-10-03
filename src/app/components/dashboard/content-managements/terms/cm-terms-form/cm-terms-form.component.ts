import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertTypes } from "@tools/enums";
import { ContentManagementService } from '@services/content-management.service';
import { formData } from 'app/tools/general-functions';

@Component({
  selector: 'app-cm-terms-form',
  templateUrl: './cm-terms-form.component.html',
  styleUrls: ['./cm-terms-form.component.scss']
})
export class CMTermsFormComponent implements OnInit {
  form: FormGroup;
  tradeName: string;

  @Input() data: any;
  @Output() eventShowAlert: EventEmitter<any> = new EventEmitter();
  @Output() eventClearMessage: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private contentManagementService: ContentManagementService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.tradeName = this.data.trade_name;
    this.setData();
  }

  private setData(){
    this.form.patchValue({
      terms: this.data.terms,
    });
  }

  private createForm(){
    this.form = this.fb.group({
      terms: [null, [Validators.required]],
    });
  }

  onClickSave() {
    this.eventClearMessage.emit();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let data = this.dataToSend();
      this.contentManagementService.saveTerms(data).subscribe(
        (res: any) => {
          this.eventShowAlert.emit({
            type: AlertTypes.SUCCESS,
            message: `Se han guardado correctamente los cambios para ${this.tradeName.toLowerCase()}`
          });
        },
        (e) => {
          this.eventShowAlert.emit({
            type: AlertTypes.ERROR,
            message: e.error.message
          });
        }
      );
    } else {
      this.eventShowAlert.emit({
        type: AlertTypes.WARNING,
        message: 'Por favor verifique algunos datos requeridos'
      });
    }
  }

  dataToSend()
  {
    let value = this.form.value;
    value.trade_name = this.tradeName;

    let form = formData(value);

    return form;
  }

}

