import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbWindowService} from '@nebular/theme';
import {InvitePlayersComponent} from './invite-players/invite-players.component';
import {WindowFormComponent} from '../../modal-overlays/window/window-form/window-form.component';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']})
export class RoomComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  constructor(private dialogService: NbDialogService,
              private windowService: NbWindowService) {}
  openInviteModal() {
    this.dialogService.open(InvitePlayersComponent, {
      context: {
        title: 'Invite Players',
        // data : { url: '/pages/agile/room' },
      }});
  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }
  openWindowForm() {
    this.windowService.open(WindowFormComponent, { title: `Window` });
  }


}
