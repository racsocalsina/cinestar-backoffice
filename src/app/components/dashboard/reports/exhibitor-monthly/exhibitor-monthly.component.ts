import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { tradeList,emptyValues } from 'app/tools/general-functions';
import { Trades } from 'app/tools/enums';
import * as moment from 'moment';
import {ReportService} from '@services/report.service';
import { Chart, LineController, LineElement, LinearScale, 
  CategoryScale, BarController, BarElement, PointElement, Legend, Title, Tooltip
} from 'chart.js';

@Component({
  selector: 'app-reports-exhibitor-monthly',
  templateUrl: './exhibitor-monthly.component.html',
  styleUrls: ['./exhibitor-monthly.component.scss']
})

export class ExhibitorMonthlyComponent implements OnInit {
  tradeList = tradeList();  
  form: FormGroup;
  loading = false; 
  data: any = {};
  monthYearTitle: string;      
  monthName: string; 
  tradeName: string; 
  year: number;
  chart: Chart;  
  datex: any;  
  errorMessage: string;
  iconMessage: string;
  colorMessage: string;

  constructor(private fb: FormBuilder, private reportService: ReportService) { 
    this.createForm();    
    Chart.register(LineElement, LineController, LinearScale, 
      CategoryScale, BarController, BarElement, PointElement, Legend, Title, Tooltip)
  }

  ngOnInit(): void {            
    this.form.controls.trade_name.setValue(Trades.CINESTAR);  
    this.onDateChange(new Date());
    this.search();          
  }    

  onClear() {
    this.form.reset();        
  }  

  private createForm(){
    this.form = this.fb.group({      
      date: [null, [Validators.required]],            
      trade_name: [null, [Validators.required]],    
    });    
  }    

  showErrorMessage(isValidation, message)
  {
    if(isValidation)
    {
      this.errorMessage = message;
      this.iconMessage = "mdi-alert-outline";
      this.colorMessage = "alert-warning";  
    } else {
      this.errorMessage = message;
      this.iconMessage = "mdi-alert-circle";
      this.colorMessage = "alert-danger";  
    }    
  }

  clearErrorMessage()
  {
    this.errorMessage = null;
    this.iconMessage = null;
    this.colorMessage = null;  
  }
  
  search(){        

    if(this.chart)
      this.chart.destroy();

    this.clearErrorMessage();

    if(!this.form.valid)    {
      this.showErrorMessage(true, "Para obtener los datos para este reporte todos los campos son requeridos.");    
      return;
    }          

    this.loading = true;
    
    let params = this.form.value;
    params.date = this.datex.format('YYYY-MM');

    const values = emptyValues(params);        
    this.reportService.getExhibitorMonthly(values).subscribe(
      (res: any) => {         
        this.loading = false;
        this.tradeName = this.form.controls['trade_name'].value;
        this.monthYearTitle = this.datex.format('MMMM YYYY').toUpperCase();    
        this.year = parseInt(this.datex.format('YYYY')); 
        this.monthName = this.datex.format('MMMM').toUpperCase();
        this.data = res.data;           
        this.buildChart();                         
      },
      (e) => {   
        this.data = null;     
        this.loading = false;
        this.showErrorMessage(false, "Se ha producido un error al obtener los datos.")
      });
  }

  onDateChange(e) {      
    if(e !== null){          
      this.form.controls.date.setValue(this.formatDate(e));                      
    }
  }

  formatDate(date) {    
    moment.locale('es-es');    
    this.datex = moment(date);      
    return this.datex.format('YYYY-MM');
  }

  buildChart() {    
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const context = canvas.getContext('2d');  
    
    let labels = [];  
    let currents = [];
    let olds = [];       

    this.data.tickets_evolution.items.forEach(item => {
      labels.push(item.week_name);
      currents.push(item.total_tickets_current);
      olds.push(item.total_tickets_old);
    });     
    
    //olds = [1,10,900,20,200,200,0,500,30,50,50,50,50,50,10,10,10,100,1500,50,10,3000,5500];
    
    this.chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: `#Tickets Online Cine Semana ${this.year}`,
            data: currents,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: "rgba(255, 99, 132, 0.3)",
            type: 'bar',
            order: 1
          },
          {
            label: `#Tickets Online Cine Semana ${this.year - 1}`,
            data: olds,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: '#bde6fc',            
            type: 'line',
            order: 0
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {          
          legend: {
            display: true,
            position: 'top',            
          },
          title: {
            display: true,
            text: 'EVOLUCIÓN DE TICKETS ONLINE VENDIDOS POR CINE-SEMANA'
          },
        },
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        scales: {
          y: {       
            ticks: {
              autoSkip: false
            },     
            display: true,
            title: {
              display: true,
              text: 'Cantidad de tickets vendidos'
            },           
          },
          x: {            
            ticks: {
              autoSkip: false
            }
          }
        }
      },      
    });
  }

}

