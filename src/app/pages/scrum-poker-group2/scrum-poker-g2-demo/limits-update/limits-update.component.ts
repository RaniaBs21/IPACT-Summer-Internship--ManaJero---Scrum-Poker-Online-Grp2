import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {PokerService} from '../../services/poker.service';
import {LimitsModel} from '../../models/Limit.model';

@Component({
  selector: 'ngx-limits-update',
  templateUrl: './limits-update.component.html',
  styleUrls: ['./limits-update.component.scss'],
})
export class LimitsUpdateComponent {
  @Input() title: string;
  @Input() limit: LimitsModel;

  constructor(
    protected ref: NbDialogRef<LimitsUpdateComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce limit ?')) {
      this.updateLimit();
    }
  }

  updateLimit() {
    this.apiService.updateLimits(this.limit.id, this.limit).subscribe(
      () => {
        this.toastrService.success('Limit mis à jour avec succès', 'Succès');
        this.ref.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du bénéfice :', error);
        this.toastrService.danger('Échec de la mise à jour du bénéfice', 'Erreur');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
