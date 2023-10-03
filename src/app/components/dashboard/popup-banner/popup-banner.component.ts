import { Component, OnInit } from '@angular/core';
import { ContentManagementService } from '@services/content-management.service';
import {AlertTypes, Trades} from "@tools/enums";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-popup-banner',
  templateUrl: './popup-banner.component.html',
  styleUrls: ['./popup-banner.component.scss']
})

export class PopupBannerComponent implements OnInit {
  tabSelected = 'cinestar';
  loading = false;
  textMessage: string;
  iconMessage: string;
  colorMessage: string;
  cinestarData: any;
  movietimeData: any;

  constructor(private contentManagementService: ContentManagementService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    this.loading = true;

    let cinestar = this.contentManagementService.getPopupBanner({'trade_name': Trades.CINESTAR});
    let movietime = this.contentManagementService.getPopupBanner({'trade_name': Trades.MOVIETIME});

    forkJoin([cinestar, movietime]).subscribe(results => {
      this.loading = false;

      this.cinestarData = results[0]['data'];
      this.cinestarData.trade_name = Trades.CINESTAR;

      this.movietimeData = results[1]['data'];
      this.movietimeData.trade_name = Trades.MOVIETIME;
    });
  }

  selectTab(name)
  {
    this.tabSelected = name;
  }

  showAlert({type, message})
  {
    window.scroll(0,0);
    if(type == AlertTypes.WARNING)
    {
      this.textMessage = message;
      this.iconMessage = "mdi-alert-outline";
      this.colorMessage = "alert-warning";
    } else if(type == AlertTypes.ERROR) {
      this.textMessage = message;
      this.iconMessage = "mdi-alert-circle";
      this.colorMessage = "alert-danger";
    } else {
      this.getData();
      this.textMessage = message;
      this.iconMessage = "mdi-check";
      this.colorMessage = "alert-success";
    }
  }

  clearMessage()
  {
    this.textMessage = null;
    this.iconMessage = null;
    this.colorMessage = null;
  }

}

