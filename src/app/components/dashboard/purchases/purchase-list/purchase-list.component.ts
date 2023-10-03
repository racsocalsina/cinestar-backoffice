import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { originList, typeClientList ,emptyValues } from 'app/tools/general-functions';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/purchases/purchase-list/form/form.component';
import { PurchaseService } from '@services/purchase.service';
import { PurchaseStatus, Actions } from '@tools/enums';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-purchase-list',
    templateUrl: './purchase-list.component.html',
    styleUrls: ['./purchase-list.component.scss'],
})
export class PurchaseListComponent implements OnInit {
    completedStatus = 'completed';
    purchaseStatus = PurchaseStatus;
    typeList = [
        {
            id: 'completed',
            name: 'Enviado',
        },
        {
            id: 'error',
            name: 'Error',
        },
    ];
    actions = Actions;
    originList: any = originList();
    typeClientList: any = typeClientList();
    headquarterList = [];
    statusList = [];
    data: any = {};
    currentPage = 1;
    form: FormGroup;
    loading = false;
    startMinDate = null;
    endMaxDate = null;
    movies = [];

    constructor(
        private purchaseService: PurchaseService,
        private fb: FormBuilder,
        private modalService: BsModalService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getParameters();
        this.getData();
    }

    filter() {
        this.currentPage = 1;
        this.getData();
    }

    onClear() {
        this.form.reset();
        this.getData();
    }

    pageChanged(e) {
        this.currentPage = e.page;
        this.getData();
    }

    getData() {
        this.loading = true;
        const values = this.getFormData();

        this.purchaseService
            .search({ page: this.currentPage, ...values })
            .subscribe((res) => {
                this.data = res;
                this.loading = false;
            });
    }

    private getFormData() {
        let values = this.form.value;
        values.start_created_at = values.startCreatedAtSelected ? this.formatDate(values.startCreatedAtSelected) : null;
        values.end_created_at = values.endCreatedAtSelected ? this.formatDate(values.endCreatedAtSelected) : null;
        values.movie_time_date = values.movieTimeDate ? this.formatDate(values.movieTimeDate) : null;
        values.movie_time_time = values.movie_time_time ? `${values.movie_time_time }:00` : null;

        delete values['startCreatedAtSelected'];
        delete values['endCreatedAtSelected'];
        delete values['movieTimeDate'];

        return emptyValues(values);
    }

    private createForm() {
        this.form = this.fb.group({
            id: [null, []],
            headquarter_id: [null, []],
            typeClient:[null,[]],
            startCreatedAtSelected: [null, []],
            endCreatedAtSelected: [null, []],
            start_created_at: [null, []],
            end_created_at: [null, []],
            status: [null, []],
            origin: [null, []],
            remote_movkey: [null, []],
            send_fe: [null, []],
            send_internal: [null, []],
            movie_id: [null, []],
            document_number: [null, []],
            movieTimeDate: [null, []],
            movie_time_time: [null, []],
        });
    }

    onRangeCreatedAtChange(e, isEnd = false) {
        if (e !== null) {
            if (isEnd) {
                this.endMaxDate = e;
                this.form.controls.end_created_at.setValue(this.formatDate(e));
            } else {
                this.startMinDate = e;
                this.form.controls.start_created_at.setValue(
                    this.formatDate(e)
                );
            }
        }
    }

    formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    getParameters() {
        this.purchaseService.getSearchParameters().subscribe((res: any) => {
            this.headquarterList = res.data.headquarters;
            this.statusList = res.data.status;
            this.movies = res.data.movies;
        });
    }

    runProcess(item: any) {
        Swal.fire({
            title: 'Completar Compra',
            text: '¿Estás seguro de completar el proceso de compra?',
            icon: 'warning',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.purchaseService.completed(item.id).subscribe(
                    (res) => {
                        Swal.fire({
                            title: 'Se envío la compra para ser procesada',
                            text: 'La compra esta en cola, por favor espere mientras se ejecuta el proceso, para verificar si la compra se completo satisfactoriamente vuelva a buscar la compra en caso retorne un error se notificará al administrador.',
                            icon: 'info',
                        });
                    },
                    (e) => {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            text: 'El sistema ha retornado un error',
                            icon: 'error',
                        });
                    }
                );
            }
        });
    }

    onCancel(item: any) {
        Swal.fire({
            title: 'Anular Compra',
            text: `¿Estás seguro de anular la compra con el id: ${item.id}?`,
            icon: 'warning',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.purchaseService.cancelled(item.id).subscribe(
                    (res) => {
                        this.filter();
                        Swal.fire({
                            title: 'Se anuló la compra',
                            text: `La compra con el id: ${item.id} se anuló correctamente.`,
                            icon: 'info',
                        });
                    },
                    (e) => {
                        Swal.fire({
                            title: 'Ha ocurrido un error',
                            text: 'El sistema ha retornado un error',
                            icon: 'error',
                        });
                    }
                );
            }
        });
    }

    public showModal(action, data?: {}): void {
        const initialState = {
            data,
            action,
        };
        const modal = this.modalService.show(FormComponent, {
            class: 'modal-form modal-dialog-centered modal-lg',
            ignoreBackdropClick: true,
            initialState,
        });
        modal.content.eventClosed.subscribe((status: any) => {
            if (status) {
                this.filter();
            }
        });
    }
}
