import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BannerService } from '@services/banner.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import {
    bannerPageList,
    bannerTypeList,
    tradeList,
} from 'app/tools/general-functions';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    form: FormGroup;
    public eventClosed: EventEmitter<any> = new EventEmitter();
    banner: any;
    error: string;
    isLoading = false;
    pageList = bannerPageList();
    typeList = bannerTypeList();
    tradeList = tradeList();
    requestFailed: boolean;

    constructor(
        private fb: FormBuilder,
        public bsModalRef: BsModalRef,
        private bannerService: BannerService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        if (this.banner) {
            this.form.patchValue(this.banner);
            this.form.controls.image.setValidators([]);
            this.form.controls.image.updateValueAndValidity();
        }
    }

    getDimensions() {
        if (this.form.value.type == 'web') {
            return '1366px × 471px';
        } else if (this.form.value.type == 'movil') {
            return '348px × 515px';
        } else {
            return '375px × 276 px';
        }
    }

    uploadFile(file) {
        this.requestFailed = false;
        this.form.controls.image.setValue(file);
        /*new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = resolve;
      fr.readAsDataURL(file);
    }).then((e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        if (img.width === 100 && img.height === 100) {
          alert(`Nice, image is the right size. It can be uploaded`)
          // upload logic here
        } else {
          alert(`Sorry, this image doesn't look like the size we wanted. It's
        ${img.width} x ${img.height} but we require 100 x 100 size image.`);
        }
      }
    });*/
    }

    onClickSave() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.isLoading = true;
            if (this.banner) {
                this.bannerService
                    .update(this.banner.id, this.form.value)
                    .subscribe(
                        (res: any) => {
                            this.success();
                        },
                        (e) => {
                            this.requestFailed = true;
                            this.failure(e);
                        }
                    );
            } else {
                this.bannerService.create(this.form.value).subscribe(
                    (res: any) => {
                        this.success();
                    },
                    (e) => {
                        this.requestFailed = true;
                        this.failure(e);
                    }
                );
            }
        }
    }

    private success() {
        this.isLoading = false;
        this.eventClosed.emit(true);
        this.bsModalRef.hide();
    }

    private failure(e) {
        this.isLoading = false;
        this.error = e.error.message;
    }

    private createForm() {
        this.form = this.fb.group({
            type: [null, [Validators.required]],
            path: [null, []],
            image: [null, [Validators.required]],
            link: [null, []],
            trade_name: [null, [Validators.required]],
            download_app: [null, []],
            page: [null, []],
        });
    }

    changeType() {
        if (this.form.get('type').value == 'movil') {
            this.form.get('page').setValue(null);
            this.changeValidator('page', false);
        } else {
            this.changeValidator('page', true);
        }
    }

    changeValidator(name, required) {
        if (required) {
            this.form.get(name).setValidators([Validators.required]);
        } else {
            this.form.get(name).setValidators(null);
        }
        this.form.get(name).updateValueAndValidity();
    }
}
