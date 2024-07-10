import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {PokerService} from '../../services/poker.service';
import {BenefitsModel} from '../../models/Benefit.model';
import {LimitsModel} from '../../models/Limit.model';

@Component({
  selector: 'ngx-limitss-add',
  templateUrl: './limitss-add.component.html',
  styleUrls: ['./limitss-add.component.scss'],
})
export class LimitssAddComponent implements OnInit {
  addLimitForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<LimitssAddComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.addLimitForm = this.fb.group({
      title: ['', Validators.required],
      limitDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addLimitForm.valid) {
      if (confirm('Êtes-vous sûr de vouloir ajouter ce bénéfice ?')) {
        this.addLimit();
      }
    } else {
      this.toastrService.danger('Veuillez remplir tous les champs', 'Erreur');
    }
  }

  addLimit() {
    const newLimit: LimitsModel = this.addLimitForm.value;
    this.apiService.addLimit(newLimit).subscribe(
      (benefit) => {
        this.toastrService.success('Bénéfice ajouté avec succès', 'Succès');
        this.ref.close(benefit);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du bénéfice :', error);
        this.toastrService.danger('Échec de l\'ajout du bénéfice', 'Erreur');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
