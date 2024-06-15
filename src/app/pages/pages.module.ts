import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ScrumPokerGroup2Component } from './scrum-poker-group2/scrum-poker-group2.component';
import { ScrumPokerGroup2DemoComponent } from './scrum-poker-group2/scrum-poker-group2-demo/scrum-poker-group2-demo.component';
import {ScrumPokerG2DemoComponent} from './scrum-poker-group2/scrum-poker-g2-demo/scrum-poker-g2-demo.component';
import {ScrumPokerG2DemodModule} from './scrum-poker-group2/scrum-poker-g2-demo/scrum-poker-g2-demo.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ScrumPokerG2DemodModule,
  ],
  declarations: [
    PagesComponent,
    ScrumPokerGroup2Component,
    ScrumPokerGroup2DemoComponent,
  ],
})
export class PagesModule {
}
