import { Component, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { LimitsModel } from '../../models/Limit.model';

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
    if (confirm('Are you sure you want to update this limit?')) {
      this.updateLimit();
    }
  }

  updateLimit() {
    this.apiService.updateLimits(this.limit.id, this.limit).subscribe(
      () => {
        this.toastrService.success('Limit updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the limit:', error);
        this.toastrService.danger('Failed to update the limit', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
