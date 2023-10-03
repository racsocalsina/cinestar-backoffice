import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import {Actions, AlertTypes, Trades} from "@tools/enums";
import { ContentManagementService } from '@services/content-management.service';
import { formData } from 'app/tools/general-functions';

@Component({
  selector: 'app-popup-banner-form',
  templateUrl: './popup-banner-form.component.html',
  styleUrls: ['./popup-banner-form.component.scss']
})
export class PopupBannerFormComponent implements OnInit {
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
      /*
    this.form.patchValue({

    });
    */
  }

  private createForm(){
    this.form = this.fb.group({
      image: [null, [Validators.required]],
    });
  }

  uploadFile(file, item = null) {
    if(item == null)
      this.form.controls.image.setValue(file);
    else
    {
      let key = item.get('key').value;

      let items = this.form.get('benefits') as FormArray;
      let itemFound = items.at(items.value.findIndex(x => x.key === key));

      itemFound.patchValue({
        image: file,
      });
    }
  }

  onClickSave() {
    this.eventClearMessage.emit();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let data = this.dataToSend();
      this.contentManagementService.savePopupBanner(data).subscribe(
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

