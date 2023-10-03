import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { Roles } from '@tools/enums';

declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    sendEmailForm: FormGroup;
    error: string;
    isLoading: boolean;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initSendEmailForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            document_number: [null, [Validators.required]],
            password: [null, Validators.required],
        });
    }

    initSendEmailForm(): void {
        this.sendEmailForm = this.fb.group({
            email: [null, [Validators.required]],
        });
    }

    showRecoveryForm(): void {
        this.error = null;
        $('#loginform').slideUp();
        $('#recoverform').fadeIn();
    }

    showLoginForm(): void {
        this.error = null;
        $('#loginform').fadeIn();
        $('#recoverform').slideUp();
    }

    async login() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.isLoading = true;
            this.authService.login(this.form.value).subscribe(
                (res: any) => {
                    this.isLoading = false;
                    localStorage.setItem(
                        'admin-cinestar',
                        btoa(JSON.stringify(res.data))
                    );

                    if (res.data.role == Roles.MARKETING)
                        this.router.navigate(['/content-managements/partner']);
                    else
                        this.router.navigate(['/cinemas']);
                },
                (e) => {
                    this.isLoading = false;
                    this.error = e.error.message;
                    console.log(e);
                }
            );
        }
    }

    sendVerificationCode(): void {
        //
    }
}
