import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@components/shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopupBannerComponent } from './popup-banner.component';
import { PopupBannerRoutingModule } from './popup-banner-routing.module';
import { PopupBannerFormComponent } from './popup-banner-form/popup-banner-form.component';

@NgModule({
  declarations: [PopupBannerComponent, PopupBannerFormComponent],
  imports: [
    CommonModule,
    PopupBannerRoutingModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class PopupBannerModule { }
