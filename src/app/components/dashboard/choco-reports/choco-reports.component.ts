import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatsService } from '@services/stats.service';
import { emptyValues } from '@tools/general-functions';
import * as moment from 'moment';

@Component({
  selector: 'app-choco-reports',
  templateUrl: './choco-reports.component.html',
  styleUrls: ['./choco-reports.component.scss']
})
export class ChocoReportsComponent implements OnInit {
  cinemas = [];
  products = [];
  combos = [];
  schedules = [];
  total_products = 0;
  total_amount = 0;
  total_online = 0;
  total_remote = 0;
  form: FormGroup;
  loading = false;
  minDate = null;
  maxSchedules = [];
  error = false;

  selectedMonth: string = null; 
  selectedDate: string = null;

  constructor(
    private statsService: StatsService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getParameters();
  }
  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('monthInput') monthInput: ElementRef;
  
  onMonthChange(e) {
    this.minDate = e;
    this.selectedMonth = e;
    const date = e ? parseInt(moment(e).format('MM')) : null;
    const year = e ? parseInt(moment(e).format('YYYY')) : null;
    this.form.controls.year.setValue(year);
    this.form.controls.month.setValue(date);
    this.getTotals();
  }

  onDateChange(e) {
    this.selectedDate = e;
    let startDate = e ? this.formatDate(e[0]) : null;
    let endDate = e ? this.formatDate(e[1]) : null;
    this.form.controls.start_date.setValue(startDate);
    this.form.controls.end_date.setValue(endDate);
    this.getTotals();
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  filter() {
    if (this.form.value.is_presale == false) {
      this.form.controls.is_presale.setValue(null);
      this.form.controls.start_schedule.setValue(null);
      this.form.controls.end_schedule.setValue(null);
    }
    this.getTotals();
  }

  onScheduleChange() {
    console.log(this.schedules);
    this.maxSchedules = this.schedules.filter((item) => item.time_start > this.form.get('start_schedule').value);
  }

  getParameters() {
    const values = emptyValues(this.form.value);
    this.statsService.getChocoParameters(values).subscribe(
      (res: any) => {
        this.cinemas = res.data.headquarters;
        this.products = res.data.products;
        this.combos = res.data.combos;
        this.schedules = res.data.schedules;
      }
    )
  }

  getTotals() {
    const values = emptyValues(this.form.value);
    this.loading = true;
    if (Object.keys(values).length === 0) {
      this.initTotals();
    } else {
      this.statsService.geTotalsChoco(values).subscribe(
        (res: any) => {
          this.total_amount = res.data.total_amount;
          this.total_online = res.data.total_count;
          this.total_products = res.data.total_products;
          this.total_remote = res.data.total_remote;
          this.loading = false;
        },
        (e) => this.failure()
      )
    }
  }

  private failure() {
    this.error = true;
    this.form.reset();
    this.getTotals();
  }

  private initTotals() {
    this.total_amount = 0;
    this.total_online = 0;
    this.total_products = 0;
    this.total_remote = 0;
    this.loading = false;
  }

  private createForm() {
    this.form = this.fb.group({
      year: [null, []],
      month: [null, []],
      start_date: [null, []],
      end_date: [null, []],
      headquarter_id: [null, []],
      product_id: [null, []],
      is_presale: [null, []],
      start_schedule: [null, []],
      end_schedule: [null, []],
    });
  }

  onClear() {
    this.form.reset();
    this.selectedMonth = null;
    this.selectedDate = null; 
    this.dateInput.nativeElement.value = '';
    this.monthInput.nativeElement.value = '';
    this.getTotals();
}
}
