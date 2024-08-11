import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrls: ['./invite-players.component.scss']})
export class InvitePlayersComponent {
  @Input() title: string;
  @Input() url: string;
  @Input() sessionId: string; // Automatically set from parent component
  email: string;
  constructor(protected ref: NbDialogRef<InvitePlayersComponent>, private apiService: ApiService,
              private toastrService: NbToastrService) {}
  confirmInvite() {
    if (confirm('Are you sure you want to invite this user?')) {
      this.sendInvitation();
    }
  }

  sendInvitation() {
    if (this.email && this.sessionId) {
      this.apiService.inviteUserToSession(this.sessionId, this.email).subscribe(
        () => {
          this.toastrService.danger('Invitation sent successfully', 'Success');
          this.ref.close();
        },
        (error) => {
          this.toastrService.success('Invitation sent successfully', 'Success');
        },
      );
    }
  }
  cancel() {
    this.ref.close();
  }
}
