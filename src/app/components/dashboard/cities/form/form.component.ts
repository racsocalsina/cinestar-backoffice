import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '@services/city.service';
import { tradeList } from '@tools/general-functions';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    form: FormGroup;
    isLoading = false;
    tradeNames = tradeList();
    error: string;
    public eventClosed: EventEmitter<any> = new EventEmitter();
    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private cityService: CityService
    ) {
        this.createForm();
    }

    ngOnInit(): void {}

    onClickSave() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.isLoading = true;
            this.cityService.create(this.form.value).subscribe(
                (res: any) => {
                    this.eventClosed.emit(true);
                    this.bsModalRef.hide();
                },
                (e) => {
                    this.error = e.error.message;
                }
            );
        }
    }

    private createForm() {
        this.form = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(30)]],
            trade_name: [null, [Validators.required]],
        });
    }
}
