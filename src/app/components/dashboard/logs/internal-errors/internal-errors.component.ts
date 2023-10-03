import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogService } from '@services/log.service';
import { emptyValues } from 'app/tools/general-functions';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/logs/internal-errors/form/form.component';

@Component({
  selector: 'app-logs-internal-errors',
  templateUrl: './internal-errors.component.html',
  styleUrls: ['./internal-errors.component.scss']
})
export class InternalErrorsComponent implements OnInit {    
  actionList = [
    {
      id: 'INSERT',
      name: 'INSERT'
    },
    {
      id: 'UPDATE',
      name: 'UPDATE'
    },
    {
      id: 'DELETE',
      name: 'DELETE'
    }
  ];
  headquarters = [];
  data: any = {}
  currentPage = 1;
  form: FormGroup;
  loading = false;
  startMinDate = null;  
  endMaxDate = null;  

  constructor(
    private logService: LogService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) { 
    this.createForm();    
  }

  ngOnInit(): void {  
    let iniDate = new Date();
    this.onRangeDateChange(iniDate);
    this.form.controls.startSelectedDate.setValue(moment(iniDate).format('DD/MM/YYYY'));  
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
    const values = emptyValues(this.form.value);
    this.logService.getInternalErrors({ page: this.currentPage, per_page: 20, ...values }).subscribe(
      (res) => { 
        this.data = res 
        this.loading = false;
      });
  }

  private createForm(){
    this.form = this.fb.group({      
      headquarter_id: [null, []],      
      actionable: [null, []],      
      action_realized: [null, []],     
      startSelectedDate: [null, []],
      endSelectedDate: [null, []],
      start_date: [null, []],
      end_date: [null, []],                  
    });    
  }  

  onRangeDateChange(e, isEnd = false) {
    if(e !== null){            
      if(isEnd){
        this.endMaxDate = e;
        this.form.controls.end_date.setValue(this.formatDate(e));        
      } else {
        this.startMinDate = e;
        this.form.controls.start_date.setValue(this.formatDate(e));           
      }        
    }      
  }  
  
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  getParameters() {
    const values = emptyValues(this.form.value);
    this.logService.getInternalErrorsParameters().subscribe(
      (res: any) => {
        this.headquarters = res.data.headquarters;        
      }
    )
  }

  public showModal(data: any): void {
    const initialState = {
      data      
    };
    const modal = this.modalService.show(FormComponent, {
      class: 'modal-form modal-dialog-centered modal-lg',
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
