import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';

// modules
import { ThemeModule } from '../../@theme/theme.module';
import { ScrumPokerGroup2RoutingModule } from './scrum-poker-group2-routing.module';
import {ScrumPokerG2DemoComponent} from './scrum-poker-g2-demo/scrum-poker-g2-demo.component';
import {MsalModule} from '@azure/msal-angular';
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../@core/core.module';
import {BrowserModule} from '@angular/platform-browser';


const MODULES = [
  FormsModule,
  ThemeModule,
  ScrumPokerGroup2RoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
];

const SERVICES = [
];

@NgModule({
    imports: [
        ...MODULES,
        OAuthModule.forRoot(),
        MsalModule,
        CoreModule,
        CommonModule,
        BrowserModule,
    ],
    declarations: [
    ],
    providers: [
        ...SERVICES,
        {provide: OAuthStorage, useValue: localStorage},

    ],
})
export class ScrumPokerGroup2Module {
}
