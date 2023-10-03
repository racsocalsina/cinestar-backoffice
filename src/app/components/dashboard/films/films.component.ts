import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/films/form/form.component';
import { CinemasAvailableComponent } from '@components/dashboard/films/cinemas-available/cinemas-available.component';
import { FilmService } from '@services/film.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyValues } from 'app/tools/general-functions';
import { SharedService } from '@services/shared.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  enable = true;
  isLoading = false;
  films: any = {};
  currentPage = 1;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private filmService: FilmService,
    public sharedService: SharedService
  ) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.getFilms();
  }

  onClickViewCinemas(film?: {}): void {
    const initialState = {
      film
    };
    const modal = this.modalService.show(CinemasAvailableComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        // this.getListUsers();
      }
    });
  }

  onClickForm(): void {
    this.showForm();
  }

  onClickEdit(item?: any): any {
    this.showForm(item);
  }

  private showForm(film?: {}): void {
    const initialState = {
      film
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getFilms();
      }
    });
  }

  onUpdateStatus(id) {
    this.filmService.updateStatus(id).subscribe(
      (res) => { this.getFilms(); }
    )
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getFilms();
  }

  filter() {
    this.currentPage = 1;
    this.getFilms();
  }

  private getFilms() {
    const values = emptyValues(this.form.value);
    this.filmService.getAll({ page: this.currentPage, ...values }).subscribe(
      (res) => this.films = res
    )
  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, null]
    });
  }
}
