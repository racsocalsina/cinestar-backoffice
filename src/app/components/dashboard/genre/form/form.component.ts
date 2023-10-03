import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreService } from '@services/genre.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  genre: any;
  form: FormGroup;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  error;
  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private genreService: GenreService) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.genre) {
      this.form.patchValue(this.genre);
    }
  }

  onClose() {
    this.eventClosed.emit(false);
    this.bsModalRef.hide();
  }

  onClickSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.genre) {
        this.genreService.update(this.genre.id, this.form.value).subscribe(
          (res: any) => {
            this.success();
          },
          (e) => this.error = e.error.message
        );
      } else {
        this.genreService.create(this.form.value).subscribe(
          (res: any) => {
            this.success();
          },
          (e) => this.error = e.error.message
        );
      }
    }
  }

  private success() {
    this.eventClosed.emit(true);
    this.bsModalRef.hide();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(30)]],
      short: [null, [Validators.required, Validators.maxLength(30)]],
      status: [true, null]
    });
  }

}
