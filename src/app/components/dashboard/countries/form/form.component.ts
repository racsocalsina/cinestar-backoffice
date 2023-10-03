import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '@services/country.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  error:string;
  country: any;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private countryService: CountryService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.country) this.form.patchValue(this.country);
  }

  onClickSave() {
    console.log("?")
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      if (this.country) {
        this.countryService.update(this.country.id, this.form.value).subscribe(
          (res: any) => {
            this.success();
          },
          (e) => { this.failure(e) }
        );
      } else {
         this.countryService.create(this.form.value).subscribe(
        (res: any) => {
          this.success();
        },
        (e) => { this.failure(e) }
      );
      }
     
    }
  }

  private success() {
    this.eventClosed.emit(true);
    this.bsModalRef.hide();
  }

  private failure(e) {
    this.isLoading = false;
    this.error = e.error.message
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(30)]]
    });
  }
}
