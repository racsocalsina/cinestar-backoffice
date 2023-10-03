import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/genre/form/form.component';
import { GenreService } from '@services/genre.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  form: FormGroup;
  enable = true;
  isLoading = false;
  genres: any = [];
  constructor(private modalService: BsModalService,
    private genreService: GenreService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  onClickForm(): void {
    this.showForm();
  }

  onClickEdit(item: any): void {
    this.showForm(item);
  }

  private showForm(genre?: {}): void {
    const initialState = {
      genre
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getGenres();
      }
    });
  }

  public onUpdateStatus(genre) {
    genre.status = !genre.status;
    this.genreService.update(genre.id, genre).subscribe(
      (res) => { }
    );
  }
  public onClickDelete(id) {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de eliminar el género?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.genreService.delete(id).subscribe(
            (res: any) => { this.getGenres(); }
          );
        }
      });
  }

  public getGenres() {
    this.genreService.getAll().subscribe(
      (res) => { this.genres = res; }
    );
  }
}
