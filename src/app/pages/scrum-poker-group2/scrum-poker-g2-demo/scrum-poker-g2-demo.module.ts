import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule, NbStepperModule, NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../../@theme/theme.module';
// import { TrafficChartComponent } from './traffic/traffic-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrumPokerG2DemoComponent} from './scrum-poker-g2-demo.component';
// import {StepperComponent} from './stepper/stepper.component';
import {RouterLink} from '@angular/router';
import { DemoUpdateComponent } from './demo-update/demo-update.component';
// import { BenefitsUpdateComponent } from './benefits-update/benefits-update.component';
import { LimitsUpdateComponent } from './limits-update/limits-update.component';
import { BenefitsAddComponent } from './benefits-add/benefits-add.component';
// import { LimitssAddComponent } from './limitss-add/limitss-add.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import {StepsUpdateComponent} from './steps/steps-update/steps-update.component';
import {StepCreateComponent} from './steps/step-create/step-create.component';
import {BenifitsUpdateComponent} from './benifits-update/benifits-update.component';
import { LimitssAddComponent } from './limitss-add/limitss-add.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { IntroUpdateComponent } from './intro-update/intro-update.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbStepperModule,
    ReactiveFormsModule,
    RouterLink,
    NbInputModule,
  ],
  declarations: [
    ScrumPokerG2DemoComponent,
    DemoFormComponent,
    DemoUpdateComponent,
    LimitsUpdateComponent,
    BenefitsAddComponent,
    BenifitsUpdateComponent,
    StepsUpdateComponent,
    StepCreateComponent,
    NewsUpdateComponent,
    LimitssAddComponent,
    SecurityCamerasComponent,
    IntroUpdateComponent,
  ],
  exports: [
  ],
})
export class ScrumPokerG2DemodModule { }
