import { Component, EventEmitter, OnInit } from '@angular/core';
import { CinemaService } from '@services/cinema.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images;
  cinemaId: string;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  constructor(
    private cinemaService: CinemaService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  onClickEdit(id) {
    this.cinemaService.updateMainImage(id).subscribe(
      (res) => { this.success(); }
    )
  }

  onClickDelete(id) {
    this.cinemaService.deleteImage(id).subscribe(
      (res) => { this.success(); }
    )
  }

  uploadFile(file) {
    this.cinemaService.addImage(this.cinemaId, { 'files[]': [file] }).subscribe(
      (res) => { this.success(); }
    )
  }

  private success() {
    this.eventClosed.emit(true);
    this.bsModalRef.hide();
  }
}
