import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/users-admin/form/form.component';
import { AdminService } from '@services/admin.service';
import { SharedService } from '@services/shared.service';
import Swal from 'sweetalert2'
import { Roles } from '@tools/enums';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})

export class UsersAdminComponent implements OnInit {
  form: FormGroup;
  enable = true;
  isLoading = false;
  fakeAsync: Observable<boolean> = new Observable(observer => {
    this.isLoading = true;
    const timeout = setTimeout(() => {
      this.isLoading = false;
      observer.next(true);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  users: any = [];
  documentTypes = [];
  cinemas = [];
  roles = [];
  currentPage = 1;
  Roles = Roles;
  
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private adminService: AdminService,
    private sharedService: SharedService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getParams();
  }

  private getParams() {
    this.sharedService.getParams().subscribe(
      (res: any) => {
        this.cinemas = res.data.headquarters;
        this.documentTypes = res.data.document_types;
        this.roles = res.data.roles;
      }
    );
  }

  public getUsers() {
    this.adminService.getAll({}).subscribe(
      (res: any) => {
        this.users = res;
      }
    );
  }

  public onUpdateStatus(id) {
    this.adminService.updateStatus(id).subscribe(
      (res: any) => { }
    );
  }

  pageChanged(e) {
    console.log(e);
  }

  onClickForm(): void {
    this.showForm();
  }

  onClickEdit(item: any): void {
    this.showForm(item);
  }
  private showForm(user?: {}): void {
    const initialState = {
      user
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getUsers();
      }
    });
  }

  onClickDelete(id) {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de eliminar el usuario?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.adminService.delete(id).subscribe(
            (res: any) => { this.getUsers(); }
          );
        }
      });
  }

  private createForm() {
    this.form = this.fb.group({
      document_type: [null, null]
    })
  }
}
