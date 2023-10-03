import { Component, OnInit } from '@angular/core';
import { SettingService } from '@services/setting.service';

@Component({
  selector: 'app-settings-erp-system-vars',
  templateUrl: './erp-system-vars.component.html',
  styleUrls: ['./erp-system-vars.component.scss']
})
export class ErpSystemVarsComponent implements OnInit {
  
  settings: any = [];
  loading = false;

  constructor(
    private settingService: SettingService,    
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  
  private getData() {
    this.loading = true;
    this.settingService.getErpSystemVars().subscribe(
      (res: any) => { 
        this.loading = false;
        this.settings = res.data.sort((a, b) => (a.headquarter_name > b.headquarter_name) ? 1 : -1); 
      }
    );
  }
}
