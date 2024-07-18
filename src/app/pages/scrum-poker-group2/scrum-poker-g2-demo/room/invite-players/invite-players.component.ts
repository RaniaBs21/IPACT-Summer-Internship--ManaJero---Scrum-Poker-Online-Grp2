import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';

@Component({
  selector: 'ngx-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrls: ['./invite-players.component.scss']})
export class InvitePlayersComponent {
  @Input() title: string;
  @Input() url: string;
  constructor(protected ref: NbDialogRef<InvitePlayersComponent>) {}

  cancel() {
    this.ref.close();
  }
}
