import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PromotionService } from '@services/promotion.service';
import { emptyValues } from 'app/tools/general-functions';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormComponent } from '@components/dashboard/choco-promotions/form/form.component';

@Component({
  selector: 'app-choco-promotions',
  templateUrl: './choco-promotions.component.html',
  styleUrls: ['./choco-promotions.component.scss']
})
export class ChocoPromotionsComponent implements OnInit {
  movieChains = [
    {
      id: '1',
      name: 'Cinestar'
    },
    {
      id: '2',
      name: 'Movie Time'
    }
  ];
  validList = [
    {
      id: '1',
      name: 'Valido'
    },
    {
      id: '0',
      name: 'No válido'
    }
  ];
  headquarters = [];
  promotions: any = {}
  currentPage = 1;
  form: FormGroup;
  loading = false;
  startMinDate = null;  
  endMaxDate = null;   
  actions = {
    create: 0,
    edit: 1,
    view: 2
  }   
  constructor(
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) { 
    this.createForm();
  }

  ngOnInit(): void {  
    this.getParameters();
    this.getPromotions();
  }

  filter() {
    this.currentPage = 1;
    this.getPromotions();
  }

  onClear() {
    this.form.reset();
    this.getPromotions();
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getPromotions();
  }

  getPromotions() {
    this.loading = true;
    const values = emptyValues(this.form.value);
    this.promotionService.getChocoPromotions({ page: this.currentPage, per_page: 20, ...values }).subscribe(
      (res) => { 
        this.promotions = res 
        this.loading = false;
      });
  }

  private createForm(){
    this.form = this.fb.group({      
      code: [null, []],      
      name: [null, []],      
      startSelectedDate: [null, []],
      endSelectedDate: [null, []],
      start_date: [null, []],
      end_date: [null, []],      
      movie_chain: [null, []],
      headquarter_id: [null, []],
      valid: [null, []]
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
    this.promotionService.getTicketPromotionParameters().subscribe(
      (res: any) => {
        this.headquarters = res.data.headquarters;        
      }
    )
  }

  public showModal(action, data?: {}): void {
    const initialState = {
      data,
      action
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
