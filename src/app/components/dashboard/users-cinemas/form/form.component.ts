import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  user = {};
  form: FormGroup;
  constructor( private fb: FormBuilder, public bsModalRef: BsModalRef ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  filter(): void {}

  private createForm(): void {
    this.form = this.fb.group({
      typeOfDocument: [null, null],
      document: [null, null],
      cinema: [null, null],
      name: [null, null],
      lastname: [null, null],
      typeOfUser: [null, null],
      password: [null, null],
    });
  }

}
