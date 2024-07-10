import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { BenefitsModel } from '../../models/Benefit.model';

@Component({
  selector: 'ngx-benefits-update',
  templateUrl: './benefits-update.component.html',
  styleUrls: ['./benefits-update.component.scss'],
})
export class BenefitsUpdateComponent implements OnInit {
  @Input() title: string;
  @Input() benefit: BenefitsModel;

  constructor(
    protected ref: NbDialogRef<BenefitsUpdateComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce bénéfice ?')) {
      this.updateBenefit();
    }
  }

  updateBenefit() {
    this.apiService.updateBenifits(this.benefit.id, this.benefit).subscribe(
      () => {
        this.toastrService.success('Bénéfice mis à jour avec succès', 'Succès');
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
