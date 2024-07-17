import {Component, Input} from '@angular/core';
import {BenefitsModel} from '../../Models/BenefitsModel';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';

@Component({
  selector: 'ngx-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrls: ['./invite-players.component.scss']})
export class InvitePlayersComponent {
  @Input() title: string;
  @Input() benefit: BenefitsModel;

  constructor(
    protected ref: NbDialogRef<InvitePlayersComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}
  cancel() {
    this.ref.close();
  }
}
