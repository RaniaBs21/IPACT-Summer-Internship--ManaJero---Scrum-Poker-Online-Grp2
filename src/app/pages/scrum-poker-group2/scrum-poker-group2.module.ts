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
import { FormDemoComponent } from './form-demo/form-demo.component';


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
    ],
    declarations: [
  ],
    providers: [
        ...SERVICES,
    ],
})
export class ScrumPokerGroup2Module {
}
