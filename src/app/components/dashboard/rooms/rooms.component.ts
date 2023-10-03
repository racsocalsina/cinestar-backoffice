import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/rooms/form/form.component';
import { RoomService } from '@services/room.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
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
  rooms: any = {};
  constructor(private modalService: BsModalService,
    private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }


  onClickForm(): void {
    this.showForm();
  }

  onClickEdit(item: any): void {
    this.showForm(item);
  }
  private showForm(room?: {}): void {
    const initialState = {
      room
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      initialState
    });
    modal.content.eventClosed.subscribe((status: any) => {
      if (status) {
        this.getRooms();
      }
    });
  }

  onUpdateStatus(id) {
    this.roomService.updateStatus(id).subscribe(
      (res: any) => {
      }
    )
  }

  onClickDelete(id) {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de eliminar el tipo de sala?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.roomService.delete(id).subscribe(
            (res: any) => { this.getRooms(); }
          );
        }
      });
  }

  private getRooms() {
    this.roomService.getAll().subscribe(
      (res: any) => {
        this.rooms = res;
      }
    )
  }
}
