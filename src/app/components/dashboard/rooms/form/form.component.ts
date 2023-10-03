import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '@services/room.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  room: any;
  form: FormGroup;
  public eventClosed: EventEmitter<any> = new EventEmitter();
  error: string;
  constructor(private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private roomService: RoomService) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.room) {
      this.form.patchValue(this.room);
    }
  }

  onClickSave() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.room) {
        this.roomService.update(this.room.id, this.form.value).subscribe(
          (res: any) => {
            this.eventClosed.emit(true);
            this.bsModalRef.hide();
          },
          (e) => { this.error = e.error.message }
        );
      } else {
        this.roomService.create(this.form.value).subscribe(
          (res: any) => {
            this.eventClosed.emit(true);
            this.bsModalRef.hide();
          },
          (e) => { this.error = e.error.message }
        );
      }
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(20)]],
      short: [null, [Validators.required, Validators.maxLength(10)]],
      description: [null, [Validators.maxLength(100)]],
      status: [1, [Validators.required]],
    });
  }

}
