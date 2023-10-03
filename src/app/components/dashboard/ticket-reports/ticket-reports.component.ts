import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatsService } from '@services/stats.service';
import { emptyValues } from '@tools/general-functions';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-reports',
  templateUrl: './ticket-reports.component.html',
  styleUrls: ['./ticket-reports.component.scss']
})
export class TicketReportsComponent implements OnInit {
  cinemas = [];
  movies = [];
  schedules = [];
  total_tickets = 0;
  total_amount = 0;
  total_online = 0;
  total_remote = 0;
  form: FormGroup;
  minDate = null;
  loading = false;
  error = false;
  selectedMonth: string = null; 
  selectedDate: string = null;

  constructor(
    private statsService: StatsService,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getParameters();
    //this.getTotals();
  }

  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('monthInput') monthInput: ElementRef;

  onClickExport() {

  }

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
    this.form.controls.start_date.setValue(this.formatDate(e[0]));
    this.form.controls.end_date.setValue(this.formatDate(e[1]));
    this.getTotals();
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  filter() {
    if (this.form.value.is_presale == false) this.form.controls.is_presale.setValue(null);
    this.getTotals();
  }

  getParameters() {
    const values = emptyValues(this.form.value);
    this.statsService.getParameters(values).subscribe(
      (res: any) => {
        this.cinemas = res.data.headquarters;
        this.movies = res.data.movies;
        this.schedules = res.data.schedules;
      }
    )
  }

  getTotals() {
    this.loading = true;
    const values = emptyValues(this.form.value);
    if (Object.keys(values).length === 0) {
      this.initTotals();
    } else {
      this.statsService.geTotalsTickets(values).subscribe(
        (res: any) => {
          this.total_amount = res.data.total_amount;
          this.total_online = res.data.total_count;
          this.total_tickets = res.data.total_tickets;
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
    this.total_tickets = 0;
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
      movie_id: [null, []],
      schedule: [null, []],
      is_presale: [null, []]
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
