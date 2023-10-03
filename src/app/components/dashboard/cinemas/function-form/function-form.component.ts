import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from '@services/cinema.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-function-form',
  templateUrl: './function-form.component.html',
  styleUrls: ['./function-form.component.scss']
})
export class FunctionFormComponent implements OnInit {
  form: FormGroup;
  movieVersions = [];
  movieFormats = [];
  error: string;
  movieTime: any;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaService,
    public bsModalRef: BsModalRef
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.getParams();
    this.form.patchValue({
      movie_format_id: this.movieTime.movie_format?.id,
      movie_version_id: this.movieTime.movie_version?.id
    })
  }

  public getParams() {
    this.cinemaService.getParams().subscribe(
      (res: any) => {
        this.movieVersions = res.data.movie_versions;
        this.movieFormats = res.data.movie_formats;
      }
    );
  }

  onClickSave() {
    this.cinemaService.updateMovieTime(this.movieTime.id, this.form.value).subscribe(
      (res: any) => {
        this.success();
      },
      (e) => this.error = e.error.message
    );
  }

  success() {
    this.bsModalRef.hide();
    this.eventClosed.emit(true);
  }

  private createForm() {
    this.form = this.fb.group({
      movie_format_id: [null, [Validators.required]],
      movie_version_id: [null, [Validators.required]],
    })
  }

}
