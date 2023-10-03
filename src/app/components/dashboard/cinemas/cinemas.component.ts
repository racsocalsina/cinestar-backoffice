import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/cinemas/form/form.component';
import { CinemaService } from '@services/cinema.service';
import { AuthService } from '@services/auth.service';
import { ImagesComponent } from './images/images.component';
import { Router } from '@angular/router';
import { Roles, LogStatusSync } from '@tools/enums';
import Swal from 'sweetalert2';
import { SharedService } from '@services/shared.service';
import { emptyValues, businessList } from 'app/tools/general-functions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-cinemas',
    templateUrl: './cinemas.component.html',
    styleUrls: ['./cinemas.component.scss'],
})
export class CinemasComponent implements OnInit {
    enable = true;
    isLoading = false;
    loading = false;
    fakeAsync: Observable<boolean> = new Observable((observer) => {
        this.isLoading = true;
        const timeout = setTimeout(() => {
            this.isLoading = false;
            observer.next(true);
        }, 2000);
        return () => clearTimeout(timeout);
    });
    room;
    user: any;
    Roles = Roles;
    LogStatusSync = LogStatusSync;
    data: any = {};
    currentPage = 1;
    form: FormGroup;
    businessList = businessList();

    constructor(
        private fb: FormBuilder,
        private modalService: BsModalService,
        private cinemaService: CinemaService,
        private authService: AuthService,
        private router: Router,
        public sharedService: SharedService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.getData();
    }

    onClickBillboard(id) {
        this.router.navigate(['/cinemas/' + id + '/billboard']);
    }

    onClickForm(): void {
        this.showForm();
    }

    onClickEdit(item?: any): any {
        this.showForm(item);
    }

    onClickSync(cinema: any) {
        /*
    if(cinema.last_sync_log?.status == LogStatusSync.SYNCING)
    {
      Swal.fire({
        text: 'Actualmente la sede esta en proceso de importación',
        icon: 'warning',
      });
      return;
    }
    */

        Swal.fire({
            title: 'Advertencia',
            text: `¿Estás seguro de importar los datos de la sede ${cinema.name}?`,
            icon: 'warning',
            confirmButtonText: 'OK',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                this.cinemaService.syncData(cinema.id).subscribe((res) => {
                    this.refresh();
                    Swal.fire({
                        title: `Ejecutando Importación de ${cinema.name}`,
                        text:
                            'Por favor espere mientras se termina el proceso, para verificar si la importación se completo vuelva a refrescar los datos.',
                        icon: 'info',
                    }).then(() => {
                        this.filter();
                    });
                });
            }
        });
    }

    refresh() {
        this.getData();
    }

    private showForm(cinema?: {}): void {
        const initialState = {
            cinema,
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

    public showImages(id: string, images?: {}): void {
        const initialState = {
            images,
            cinemaId: id,
        };
        const modal = this.modalService.show(ImagesComponent, {
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

    public getData() {
        this.loading = true;
        const values = emptyValues(this.form.value);
        this.cinemaService
            .search({ page: this.currentPage, ...values })
            .subscribe((res) => {
                this.loading = false;
                this.data = res;
            });
    }

    getFormats(formats: any[]) {
        return formats
            .map((f) => {
                return f.short;
            })
            .join(', ');
    }

    onUpdateStatus(id) {
        this.cinemaService.updateStatus(id).subscribe((res) => {});
    }

    filter() {
        this.currentPage = 1;
        this.getData();
    }

    private createForm() {
        this.form = this.fb.group({
            name: [null, null],
            business_name: [null, null],
        });
    }
}
