import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyValues } from 'app/tools/general-functions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/ticket-awards/form/form.component';
import { AwardService } from '@services/award.service';

@Component({
  selector: 'app-ticket-awards',
  templateUrl: './ticket-awards.component.html',
  styleUrls: ['./ticket-awards.component.scss']
})
export class TicketAwardsComponent implements OnInit {  
  data: any = {}
  currentPage = 1;
  form: FormGroup;
  loading = false;  
  actions = {
    create: 0,
    edit: 1,
    view: 2
  }  
  constructor(
    private awardService: AwardService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) { 
    this.createForm();
  }

  ngOnInit(): void {      
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
    const values = emptyValues(this.form.value);
    this.awardService.getTicketAwards({ page: this.currentPage, per_page: 20, ...values }).subscribe(
      (res) => { 
        this.data = res 
        this.loading = false;
        console.log(this.data);
      });
      
  }

  private createForm(){
    this.form = this.fb.group({      
      code: [null, []],      
      name: [null, []],           
    });    
  }  

  public showModal(action, data?: {}): void {
    const initialState = {
      data,
      action
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered',
      ignoreBackdropClick: true,
      initialState
    });   
    
    modal.content.eventClosed.subscribe((status: any) => {      
      if (status) {
        this.filter();
      }
    });
  }
}
