import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  typeOfRooms = [
    { id: 1, name: 'Seleccionar 1' },
    { id: 2, name: 'Seleccionar 2' },
    { id: 3, name: 'Seleccionar 3' },
  ];
  notification: any;
  hoursPlaceholder = 'hh';
  minutesPlaceholder = 'mm';
  secondsPlaceholder = 'ss';
  form: FormGroup;
  constructor( private fb: FormBuilder, public bsModalRef: BsModalRef ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getTimepickerConfig();
  }

  getTimepickerConfig(): TimepickerConfig {
    return Object.assign(new TimepickerConfig(), {
      hourStep: 1,
      minuteStep: 1,
      secondsStep: 1,
      showMeridian: false,
      readonlyInput: false,
      mousewheel: true,
      showMinutes: true,
      showSeconds: false,
      labelHours: 'Hours',
      labelMinutes: 'Minutes',
      labelSeconds: 'Seconds'
    });
  }

  filter(): void {}

  private createForm(): void {
    this.form = this.fb.group({
      duration: [null, null],
      country: [null, null],
    });
  }

}
