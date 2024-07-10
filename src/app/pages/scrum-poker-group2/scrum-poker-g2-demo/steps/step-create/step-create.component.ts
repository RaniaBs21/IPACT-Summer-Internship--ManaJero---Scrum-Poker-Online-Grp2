import {Component, Input} from '@angular/core';
import {StepsModel} from '../../../Models/stepsModel';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';

@Component({
  selector: 'ngx-step-create',
  templateUrl: './step-create.component.html',
  styleUrls: ['./step-create.component.scss']})
export class StepCreateComponent  {
  @Input() title: string;
  @Input() step: StepsModel;

  constructor(
    protected ref: NbDialogRef<StepCreateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}

  addStep(step: StepsModel) {
    this.apiService.addStep(step).subscribe(
      (addStepp) => {
        this.toastrService.success('step mis à jour avec succès', 'Succès');
        this.ref.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du step :', error);
        this.toastrService.danger('Échec de la mise à jour du step', 'Erreur');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
