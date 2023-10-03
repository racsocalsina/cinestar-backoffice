import { Component, EventEmitter, OnInit } from '@angular/core';
import { CinemaService } from '@services/cinema.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cinemas-available',
  templateUrl: './cinemas-available.component.html',
  styleUrls: ['./cinemas-available.component.scss']
})
export class CinemasAvailableComponent implements OnInit {
  film: any;
  cinemas: any = [];
  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(
    public bsModalRef: BsModalRef,
    private cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    this.getCinemas();
  }

  getFormats(formats: any[]) {
    return formats.map((f) => { return f.short }).join(', ');
  }

  private getCinemas() {
    this.cinemaService.getCinemas(this.film.id).subscribe(
      (res: any) => {
        console.log(res);
        this.cinemas = res.data;
      }
    )
  }
}
