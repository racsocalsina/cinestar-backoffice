import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { FilmsModule } from '@components/dashboard/films/films.module';
import { GenreModule } from '@components/dashboard/genre/genre.module';
import { RoomsModule } from '@components/dashboard/rooms/rooms.module';
import { NotificationsModule } from '@components/dashboard/notifications/notifications.module';
import { BannersModule } from './banners/banners.module';
import { CitiesModule } from './cities/cities.module';
import { ProductsModule } from './products/products.module';
import { CombosModule } from './combos/combos.module';
import { ChocoPromotionsModule } from './choco-promotions/choco-promotions.module';
import { TicketPromotionsModule } from './ticket-promotions/ticket-promotions.module';
import { CountriesModule } from './countries/countries.module';
import { ClientsModule } from './clients/clients.module';
import { TicketReportsModule } from './ticket-reports/ticket-reports.module';
import { ChocoReportsModule } from './choco-reports/choco-reports.module';
import { TicketAwardsModule } from './ticket-awards/ticket-awards.module';
import { ChocoAwardsModule } from './choco-awards/choco-awards.module';
import { ExhibitorMonthlyModule } from '@components/dashboard/reports/exhibitor-monthly/exhibitor-monthly.module';
import { SystemConfigurationModule } from './settings/system-configuration/system-configuration.module';
import { ErpSystemVarsModule } from './settings/erp-system-vars/erp-system-vars.module';
import { InternalErrorsModule } from '@components/dashboard/logs/internal-errors/internal-errors.module';
import { PurchaseListModule } from '@components/dashboard/purchases/purchase-list/purchase-list.module';
import { CMPartnerModule } from '@components/dashboard/content-managements/partner/cm-partner.module';
import { CMCorporateModule } from '@components/dashboard/content-managements/corporate/cm-corporate.module';
import { CMAboutModule } from '@components/dashboard/content-managements/about/cm-about.module';
import { CMTermsModule } from '@components/dashboard/content-managements/terms/cm-terms.module';
import { ReportQrStatusModule } from '@components/dashboard/reports/qr-status/qr-status.module';
import { PopupBannerModule } from './popup-banner/popup-banner.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users-admin',
        loadChildren: () => import('@components/dashboard/users-admin/users-admin.module').then( m => m.UsersAdminModule ),
      },
      {
        path: 'users-cinemas',
        loadChildren: () => import('@components/dashboard/users-cinemas/users-cinemas.module').then( m => m.UsersCinemasModule ),
      },
      {
        path: 'cinemas',
        loadChildren: () => import('@components/dashboard/cinemas/cinemas.module').then( m => m.CinemasModule ),
      },
      {
        path: 'films',
        loadChildren: () => import('@components/dashboard/films/films.module').then( m => FilmsModule ),
      },
      {
        path: 'genre',
        loadChildren: () => import('@components/dashboard/genre/genre.module').then( m => GenreModule ),
      },
      {
        path: 'rooms',
        loadChildren: () => import('@components/dashboard/rooms/rooms.module').then( m => RoomsModule ),
      },
      {
        path: 'notifications',
        loadChildren: () => import('@components/dashboard/notifications/notifications.module').then( m => NotificationsModule ),
      },
      {
        path: 'banners',
        loadChildren: () => import('@components/dashboard/banners/banners.module').then( m => BannersModule ),
      },
      {
        path: 'popup-banner',
        loadChildren: () => import('@components/dashboard/popup-banner/popup-banner.module').then( m => PopupBannerModule ),
      },
      {
        path: 'countries',
        loadChildren: () => import('@components/dashboard/countries/countries.module').then( m => CountriesModule ),
      },
      {
        path: 'cities',
        loadChildren: () => import('@components/dashboard/cities/cities.module').then( m => CitiesModule ),
      },
      {
        path: 'products',
        loadChildren: () => import('@components/dashboard/products/products.module').then( m => ProductsModule ),
      },
      {
        path: 'combos',
        loadChildren: () => import('@components/dashboard/combos/combos.module').then( m => CombosModule ),
      },
      {
        path: 'choco-promotions',
        loadChildren: () => import('@components/dashboard/choco-promotions/choco-promotions.module').then( m => ChocoPromotionsModule ),
      },
      {
        path: 'ticket-promotions',
        loadChildren: () => import('@components/dashboard/ticket-promotions/ticket-promotions.module').then( m => TicketPromotionsModule ),
      },
      {
        path: 'clients',
        loadChildren: () => import('@components/dashboard/clients/clients.module').then( m => ClientsModule ),
      },
      {
        path: 'tickets',
        loadChildren: () => import('@components/dashboard/ticket-reports/ticket-reports.module').then( m => TicketReportsModule ),
      },
      {
        path: 'choco-reports',
        loadChildren: () => import('@components/dashboard/choco-reports/choco-reports.module').then( m => ChocoReportsModule ),
      },
      {
        path: 'clients-ranking',
        loadChildren: () => import('./clients-ranking/clients-ranking.module').then(m => m.ClientsRankingModule)
      },
      {
        path: 'ticket-awards',
        loadChildren: () => import('@components/dashboard/ticket-awards/ticket-awards.module').then( m => TicketAwardsModule ),
      },
      {
        path: 'choco-awards',
        loadChildren: () => import('@components/dashboard/choco-awards/choco-awards.module').then( m => ChocoAwardsModule ),
      },
      {
        path: 'reports/exhibitor-monthly',
        loadChildren: () => import('@components/dashboard/reports/exhibitor-monthly/exhibitor-monthly.module').then( m => ExhibitorMonthlyModule ),
      },
      {
        path: 'settings/system-configurations',
        loadChildren: () => import('@components/dashboard/settings/system-configuration/system-configuration.module').then( m => SystemConfigurationModule ),
      },
      {
        path: 'settings/erp-system-vars',
        loadChildren: () => import('@components/dashboard/settings/erp-system-vars/erp-system-vars.module').then( m => ErpSystemVarsModule ),
      },
      {
        path: 'logs/internal-errors',
        loadChildren: () => import('@components/dashboard/logs/internal-errors/internal-errors.module').then( m => InternalErrorsModule ),
      },
      {
        path: 'purchases',
        loadChildren: () => import('@components/dashboard/purchases/purchase-list/purchase-list.module').then( m => PurchaseListModule ),
      },
      {
        path: 'content-managements/partner',
        loadChildren: () => import('@components/dashboard/content-managements/partner/cm-partner.module').then( m => CMPartnerModule ),
      },
      {
        path: 'content-managements/corporate',
        loadChildren: () => import('@components/dashboard/content-managements/corporate/cm-corporate.module').then( m => CMCorporateModule ),
      },
      {
        path: 'content-managements/about',
        loadChildren: () => import('@components/dashboard/content-managements/about/cm-about.module').then( m => CMAboutModule ),
      },
      {
        path: 'content-managements/terms',
        loadChildren: () => import('@components/dashboard/content-managements/terms/cm-terms.module').then( m => CMTermsModule ),
      },
      {
        path: 'reports/qr',
        loadChildren: () => import('@components/dashboard/reports/qr-status/qr-status.module').then( m => ReportQrStatusModule ),
      },
    ]
  },
];

@NgModule( {
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
} )
export class DashboardRoutingModule {}
