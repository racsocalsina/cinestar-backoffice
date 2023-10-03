import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/users-cinemas/form/form.component';

@Component({
  selector: 'app-users-cinemas',
  templateUrl: './users-cinemas.component.html',
  styleUrls: ['./users-cinemas.component.scss']
})
export class UsersCinemasComponent implements OnInit {
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

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  onClickForm(): void {
    this.showForm();
  }

  onClickEdit( item: any ): void {
    this.showForm( item );
  }
  private showForm( user?: {} ): void {
    const initialState = {
      user
    };
    const modal = this.modalService.show( FormComponent, {
      class: 'modal-form modal-dialog-centered',
      initialState
    } );
    modal.content.eventClosed.subscribe( ( status: any ) => {
      if ( status ) {
        // this.getListUsers();
      }
    } );
  }

}
