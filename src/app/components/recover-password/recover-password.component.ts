import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login/login.component.scss', './recover-password.component.scss']
} )
export class RecoverPasswordComponent implements OnInit {

  isLoading: boolean;
  form: FormGroup;
  error: string;
  recoveryId: any;

  constructor( private router: Router,
               private fb: FormBuilder ) {
  }

  ngOnInit(): void {

   /* if ( !localStorage.getItem( 'recoveryId' ) ) {
      this.router.navigateByUrl( '/login' ).finally();
    }*/

    // this.recoveryId = localStorage.getItem( 'recoveryId' );

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group( {
      id: this.recoveryId,
      code: [null, Validators.required],
      password: [null, [Validators.required, Validators.pattern( /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/ )]],
      password_confirmation: [null, [Validators.required, Validators.pattern( /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/ )]],
    } );
  }

  recoveryPassword(): void {
  //
  }

}
