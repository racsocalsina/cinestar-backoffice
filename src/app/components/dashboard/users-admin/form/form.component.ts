import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@services/admin.service';
import { SharedService } from '@services/shared.service';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Roles } from '@tools/enums';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    user: any = {};
    documentTypes = [];
    cinemas = [];
    roles = [];
    form: FormGroup;
    public eventClosed: EventEmitter<any> = new EventEmitter();
    isLoading = false;
    error;

    constructor(
        private fb: FormBuilder,
        public bsModalRef: BsModalRef,
        private sharedService: SharedService,
        private adminService: AdminService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getParams();
        if (this.user) {
            this.form.patchValue(this.user);
            this.form.controls.password.setValidators([]);
            this.form.controls.password.updateValueAndValidity();
            if(this.user.role == Roles.MARKETING){
                this.form.controls.headquarter_id.setValue(null);
                this.form.controls.headquarter_id.disable();
            }
        } else {
            this.form.controls.entry_date.setValue(new Date());
        }
    }

    private getParams() {
        this.sharedService.getParams().subscribe((res: any) => {
            this.cinemas = res.data.headquarters;
            this.documentTypes = res.data.document_types;
            this.roles = res.data.roles;
        });
    }

    onChangeRole(item): void {
        if(item == undefined){
            this.form.controls.headquarter_id.setValue(null);
            this.form.controls.headquarter_id.enable();
        } else {
            if(item.name == Roles.MARKETING){
                this.form.controls.headquarter_id.setValue(null);
                this.form.controls.headquarter_id.disable();
            } else {
                this.form.controls.headquarter_id.enable();
            }
        }
    }

    onDateChange(e) {
        var date = moment(e).format('YYYY-MM-DD');
        this.form.controls.entry_date.setValue(date);
    }

    onSave() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.isLoading = true;
            if (this.user) {
                const values = this.emptyValues(this.form.value);
                this.adminService.update(this.user.id, values).subscribe(
                    (res: any) => {
                        this.isLoading = false;
                        this.eventClosed.emit(true);
                        this.bsModalRef.hide();
                    },
                    (e) => {
                        this.isLoading = false;
                        this.error = e.error.message;
                    }
                );
            } else {
                this.adminService.create(this.form.value).subscribe(
                    (res: any) => {
                        this.isLoading = false;
                        this.eventClosed.emit(true);
                        this.bsModalRef.hide();
                    },
                    (e) => {
                        this.isLoading = false;
                        this.error = e.error.message;
                    }
                );
            }
        }
    }

    onClose() {
        this.eventClosed.emit(false);
        this.bsModalRef.hide();
    }

    public emptyValues(objct) {
        for (const member in objct) {
            if (
                objct[member] === null ||
                objct[member] === '' ||
                objct[member] === undefined
            ) {
                delete objct[member];
            }
        }
        return objct;
    }

    private createForm(): void {
        this.form = this.fb.group({
            document_type_id: [null, [Validators.required]],
            document_number: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.maxLength(50)]],
            password: [null, [Validators.required]],
            headquarter_id: [null, []],
            entry_date: [null, [Validators.required]],
            name: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            role: [null, [Validators.required]],
            status: [1, [Validators.required]],
        });
    }
}
