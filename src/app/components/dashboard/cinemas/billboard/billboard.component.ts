import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '@services/cinema.service';
import { emptyValues } from 'app/tools/general-functions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FunctionFormComponent } from '../function-form/function-form.component';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss']
})
export class BillboardComponent implements OnInit {
  id: string;
  movieTimes: any = [];
  movies = [];
  form: FormGroup;
  currentPage = 1;
  headquarter: any;
  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getHeadquarter(this.id);
    });
    this.getBillboard();
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getBillboard();
  }

  filter() {
    this.getBillboard();
  }

  goBack() {
    this.router.navigate(['/cinemas']);
  }

  public onClickEdit(movieTime: any): void {
    const initialState = {
      movieTime: movieTime
    };
    const modal = this.modalService.show(FunctionFormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getBillboard();
      }
    });
  }

  private getHeadquarter(id: string) {
    this.cinemaService.show(id).subscribe(
      (res: any) => {
        this.headquarter = res.data;
      }
    )
  }

  private getBillboard() {
    const values = emptyValues(this.form.value);
    this.cinemaService.getMovieTimes(this.id, { page: this.currentPage, ...values }).subscribe(
      (res: any) => {
        this.movieTimes = res;
      }
    )
  }

  private createForm() {
    this.form = this.fb.group({
      movie_name: [null, null],
      date: [null, null],
    });
  }

    onUpdateStatus(id){
        this.cinemaService.updateMovieTimeStatus(id).subscribe(
            (res) => {
            }
        );
    }
}
