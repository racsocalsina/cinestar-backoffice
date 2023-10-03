import { Component, OnInit } from '@angular/core';
import { BannerService } from '@services/banner.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { FormComponent } from './form/form.component';
import {
    bannerPageList,
    bannerTypeList,
    emptyValues,
    tradeList,
} from 'app/tools/general-functions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-banners',
    templateUrl: './banners.component.html',
    styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
    data: any = {};
    currentPage = 1;
    loading = false;
    pageList = bannerPageList();
    typeList = bannerTypeList();
    tradeList = tradeList();
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modalService: BsModalService,
        private bannerService: BannerService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getData();
    }

    onClickForm(): void {
        this.showForm();
    }

    onClickEdit(item?: any): any {
        this.showForm(item);
    }

    private showForm(banner?: {}): void {
        const initialState = {
            banner,
        };
        const modal = this.modalService.show(FormComponent, {
            class: 'modal-form modal-dialog-centered',
            ignoreBackdropClick: true,
            initialState,
        });
        modal.content.eventClosed.subscribe((status: any) => {
            if (status) {
                this.getData();
            }
        });
    }

    pageChanged(e) {
        this.currentPage = e.page;
        this.getData();
    }

    onClickDelete(id) {
        Swal.fire({
            title: 'Advertencia',
            text: '¿Estás seguro de eliminar el banner?',
            icon: 'warning',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.bannerService.delete(id).subscribe((res) => {
                    this.getData();
                });
            }
        });
    }

    private getData() {
        this.loading = true;
        const values = emptyValues(this.form.value);

        this.bannerService
            .search({ page: this.currentPage, ...values })
            .subscribe((res) => {
                this.data = res;
                this.loading = false;
            });
    }

    filter() {
        this.currentPage = 1;
        this.getData();
    }

    private createForm() {
        this.form = this.fb.group({
            type: [null, null],
            trade_name: [null, null],
            page_name: [null, null],
        });
    }
}
