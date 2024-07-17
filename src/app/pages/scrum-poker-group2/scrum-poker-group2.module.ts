

import { NgModule} from '@angular/core';
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
import { SessionComponent } from './session/session.component';
import {RoomComponent} from './room/room.component';
import {InvitePlayersComponent} from './room/invite-players/invite-players.component';
import {FormsModule} from '../forms/forms.module';


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
    SessionComponent,
      RoomComponent,
      InvitePlayersComponent,
  ],
    providers: [
        ...SERVICES,
    ],
})
export class ScrumPokerGroup2Module {
}
