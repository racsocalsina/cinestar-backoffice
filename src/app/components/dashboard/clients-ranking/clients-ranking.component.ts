import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {emptyValues} from "@tools/general-functions";
import {StatsService} from "@services/stats.service";

@Component({
  selector: 'app-clients-ranking',
  templateUrl: './clients-ranking.component.html',
  styleUrls: ['./clients-ranking.component.scss']
})
export class ClientsRankingComponent implements OnInit {
  form: FormGroup;
  loading = false;
  minDate = null;
  cinemas = [];
  data: any = [];
  currentPage = 1;
  constructor(
    private statsService: StatsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getParameters();
  }

  onMonthChange(e) {
    this.minDate = e;
    const date = e ? parseInt(moment(e).format('MM')) : null;
    this.form.controls.month.setValue(date);
    this.getData();
  }

  onDateChange(e) {
    if (e){
      this.form.controls.start_date.setValue(this.formatDate(e[0]));
      this.form.controls.end_date.setValue(this.formatDate(e[1]));
    }else{
      this.form.controls.start_date.setValue(null);
      this.form.controls.end_date.setValue(null);
    }

    this.getData();
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  filter() {
    this.getData();
  }

  getData() {
    const values = emptyValues(this.form.value);
    this.loading = true;
    this.statsService.getRanking(values).subscribe(
      (res: any) => {
        this.data = res;
      }
    )
  }

  getParameters() {
    const values = emptyValues(this.form.value);
    this.statsService.getChocoParameters(values).subscribe(
      (res: any) => {
        this.cinemas = res.data.headquarters;
      }
    )
  }
  private createForm() {
    this.form = this.fb.group({
      month: [null, []],
      start_date: [null, []],
      end_date: [null, []],
      headquarter_id: [null, []],
      type: [null, []],
    });
  }

  pageChanged(e) {
    this.currentPage = e.page;
    this.getData();
  }
}
