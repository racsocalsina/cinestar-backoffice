import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from '@services/cinema.service';
import { emptyValues } from 'app/tools/general-functions';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tradeList, businessList } from 'app/tools/general-functions';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
    businessNames = businessList();
    tradeNames = tradeList();
    cities = [];
    citiesByTrade = [];
    movieFormats = [];
    cinema: any;
    form: FormGroup;
    error: string;
    loaded = false;
    public eventClosed: EventEmitter<any> = new EventEmitter();
    totalImages = 0;
    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private cinemaService: CinemaService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getParams();
        if (this.cinema) {
            const formats = [];
            this.cinema.movie_formats.map((format) => {
                formats.push(format.id);
            });
            this.form.patchValue({
                name: this.cinema.name,
                description: this.cinema.description,
                address: this.cinema.address,
                latitude: this.cinema.latitude,
                longitude: this.cinema.longitude,
                point_sale: this.cinema.point_sale,
                api_url: this.cinema.api_url,
                local_url: this.cinema.local_url,
                user: this.cinema.user,
                city_id: this.cinema.city_id,
                movie_formats: formats,
                business_name: this.cinema.business_name,
                trade_name: this.cinema.trade_name,
            });
            this.form.controls.password.setValidators([]);
            this.form.controls['files[]'].setValidators([]);
            this.form.controls.password.updateValueAndValidity();
            this.form.controls['files[]'].updateValueAndValidity();
        }
    }

    filter(): void {}

    public getParams() {
        this.cinemaService.getParams().subscribe((res: any) => {
            this.cities = res.data.cities;
            this.movieFormats = res.data.movie_formats;
            this.filterCities();
            this.loaded = true;
        });
    }

    onClickSave() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.formatData();
            const value = emptyValues(this.form.value);
            if (this.cinema) {
                this.cinemaService.update(this.cinema.id, value).subscribe(
                    (res: any) => {
                        this.eventClosed.emit(true);
                        this.bsModalRef.hide();
                    },
                    (e) => {
                        this.error = e.error.message;
                    }
                );
            } else {
                this.cinemaService.create(value).subscribe(
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
    }

    formatData() {
        const formats = this.form.value.movie_formats;
        this.form.controls.movie_formats.setValue(formats.join(','));
    }

    uploadFiles(files: File[]) {
        this.form.controls['files[]'].setValue(files);
        this.totalImages = files.length;
    }

    private createForm() {
        this.form = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(50)]],
            description: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(150)]],
            latitude: [null, [Validators.required]],
            longitude: [null, [Validators.required]],
            point_sale: [null, [Validators.required, Validators.maxLength(5)]],
            api_url: [null, [Validators.required]],
            local_url: [null, [Validators.required, Validators.maxLength(50)]],
            user: [null, [Validators.required]],
            password: [null, [Validators.required]],
            city_id: [null, [Validators.required]],
            movie_formats: [null, [Validators.required]],
            'files[]': [null, [Validators.required]],
            business_name: [null, [Validators.required]],
            trade_name: [null, [Validators.required]],
        });
    }

    filterCities() {
        if (this.loaded == true) this.form.controls['city_id'].setValue(null);

        this.citiesByTrade = this.cities.filter(
            ($item) => $item.trade_name == this.form.get('trade_name').value
        );
    }
}
