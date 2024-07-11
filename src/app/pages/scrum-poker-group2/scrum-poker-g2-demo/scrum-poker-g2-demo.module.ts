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
import { StatusCardComponent } from './status-card/status-card.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrumPokerG2DemoComponent} from './scrum-poker-g2-demo.component';
import {StepperComponent} from './stepper/stepper.component';
import {RouterLink} from '@angular/router';
import { DemoUpdateComponent } from './demo-update/demo-update.component';
import { BenefitsUpdateComponent } from './benefits-update/benefits-update.component';
import { LimitsUpdateComponent } from './limits-update/limits-update.component';
import { BenefitsAddComponent } from './benefits-add/benefits-add.component';
import { LimitssAddComponent } from './limitss-add/limitss-add.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import { NewsUpdateComponent } from './news-update/news-update.component';

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
    StatusCardComponent,
    TemperatureDraggerComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    StepperComponent,
    DemoUpdateComponent,
    BenefitsUpdateComponent,
    LimitsUpdateComponent,
    BenefitsAddComponent,
    LimitssAddComponent,
    NewsUpdateComponent,
  ],
  exports: [
    StatusCardComponent,
    TemperatureComponent,
  ],
})
export class ScrumPokerG2DemodModule { }
