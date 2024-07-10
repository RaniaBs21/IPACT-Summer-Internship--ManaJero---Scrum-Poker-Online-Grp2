import {Component, Input, OnInit} from '@angular/core';
import {DemoModel} from '../../../Models/DemoModel';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';
import {StepsModel} from '../../../Models/stepsModel';
@Component({
  selector: 'ngx-steps-update',
  templateUrl: './steps-update.component.html',
  styleUrls: ['./steps-update.component.scss']})
export class StepsUpdateComponent  {
  @Input() title: string;
  @Input() step: StepsModel;

  constructor(
    protected ref: NbDialogRef<StepsUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}



  confirmUpdate() {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce step ?')) {
      this.updateSteps();
    }
  }

  updateSteps() {
    this.apiService.updateStep(this.step.id, this.step).subscribe(
      (updateStep) => {
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


