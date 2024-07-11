import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbMenuModule,
  NbOptionModule,
  NbRadioModule, NbSelectModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ScrumPokerGroup2Component } from './scrum-poker-group2/scrum-poker-group2.component';
import {ScrumPokerG2DemodModule} from './scrum-poker-group2/scrum-poker-g2-demo/scrum-poker-g2-demo.module';
import {DemoFormComponent} from './scrum-poker-group2/scrum-poker-g2-demo/demo-form/demo-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ScrumPokerG2DemodModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbOptionModule,
    NbRadioModule,
    NbSelectModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    ScrumPokerGroup2Component,
  ],
})
export class PagesModule {
}
