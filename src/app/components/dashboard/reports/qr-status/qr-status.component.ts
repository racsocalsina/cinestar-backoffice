import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValues } from 'app/tools/general-functions';
import {ReportService} from '@services/report.service';

@Component({
  selector: 'app-reports-qr-status',
  templateUrl: './qr-status.component.html',
  styleUrls: ['./qr-status.component.scss']
})

export class ReportQrStatusComponent implements OnInit {

  form: FormGroup;
  loading = false;
  data: any = null;
  errorMessage: string;
  iconMessage: string;
  colorMessage: string;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  onClear() {
    this.form.reset();
  }

  private createForm(){
    this.form = this.fb.group({
      code: [null, [Validators.required]],
    });
  }

  showErrorMessage(isValidation, message)
  {
    if(isValidation)
    {
      this.errorMessage = message;
      this.iconMessage = "mdi-alert-outline";
      this.colorMessage = "alert-warning";
    } else {
      this.errorMessage = message;
      this.iconMessage = "mdi-alert-circle";
      this.colorMessage = "alert-danger";
    }

  }

  clearErrorMessage()
  {
    this.errorMessage = null;
    this.iconMessage = null;
    this.colorMessage = null;
  }

  search(){

    this.clearErrorMessage();

    if(!this.form.valid)    {
      this.showErrorMessage(true, "Para obtener los datos para este reporte el número de comprobante es requerido.");
      return;
    }

    this.loading = true;

    let params = this.form.value;

    const values = emptyValues(params);
    this.reportService.getQrStatusData(values).subscribe(
      (res: any) => {
        this.loading = false;
        this.data = res.data;
      },
      (e) => {
        this.data = null;
        this.loading = false;
        console.log(e)
        if(e.status == 500)
            this.showErrorMessage(false, "Se ha producido un error al obtener los datos.")
        else{
            if(e.error && e.error.message)
                this.showErrorMessage(true, e.error.message)
            else
                this.showErrorMessage(false, "Se ha producido un error al obtener los datos.")
        }
      });
  }
}

