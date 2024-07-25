import {NgModule, RendererFactory2} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {BsModalService} from 'ngx-bootstrap/modal';

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
    CommonModule,
  ],
  declarations: [
    PagesComponent,
    ScrumPokerGroup2Component,
  ],
  providers: [
    BsModalService,
  ],
})
export class PagesModule {
}
