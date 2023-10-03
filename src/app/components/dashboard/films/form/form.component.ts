import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmService } from '@services/film.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  countries = [];
  genders = [];
  film: any;
  form: FormGroup;
  error: string;
  requestFailed: boolean;

  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private filmService: FilmService) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.film) {
      this.form.patchValue({
        description: this.film.summary,
        gender_id: this.film.gender_id,
        country_id: this.film.country_id,
        url_trailer: this.film.url_trailer,
        premier_date: this.film.premier_date,
      });
    }
    this.getParams();
  }

  public getParams() {
    this.filmService.getParams().subscribe(
      (res: any) => {
        this.countries = res.data.countries;
        this.genders = res.data.movie_genders;
      }
    );
  }

  filter(): void { }

  onDateChange(e) {
    var date = moment(e).format('YYYY-MM-DD');
    this.form.controls.premier_date.setValue(date);
  }

  onClickSave() {
    this.filmService.update(this.film.id, this.form.value).subscribe(
      (res) => {
        this.eventClosed.emit(true);
        this.bsModalRef.hide();
      },
      (error) => { 
        this.requestFailed = true;
        this.showError(error);});
  }

  showError(res: any) {
    if(res.error.hasOwnProperty('dev')){
      this.error = res.error.dev;
    }else{
      this.error = "Ocurrio un error, contacte con el administrador"
    }
}

  uploadFile(file) {
    this.requestFailed = false;
    this.form.controls.image.setValue(file);
  }

  private createForm(): void {
    this.form = this.fb.group({
      description: [null, null],
      gender_id: [null, null],
      country_id: [null, null],
      url_trailer: [null, null],
      premier_date: [null, null],
      image: [null, null],
    });
  }
}

