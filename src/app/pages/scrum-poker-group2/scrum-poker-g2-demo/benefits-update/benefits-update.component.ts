import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { BenefitsModel } from '../../models/Benefit.model';

@Component({
  selector: 'ngx-benefits-update',
  templateUrl: './benefits-update.component.html',
  styleUrls: ['./benefits-update.component.scss'],
})
export class BenefitsUpdateComponent {
  @Input() title: string;
  @Input() benefit: BenefitsModel;

  constructor(
    protected ref: NbDialogRef<BenefitsUpdateComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Are you sure you want to update this benefit?')) {
      this.updateBenefit();
    }
  }

  updateBenefit() {
    this.apiService.updateBenifits(this.benefit.id, this.benefit).subscribe(
      () => {
        this.toastrService.success('Benefit updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the benefit:', error);
        this.toastrService.danger('Failed to update the benefit', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
