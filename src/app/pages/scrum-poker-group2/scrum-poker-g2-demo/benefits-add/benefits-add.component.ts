import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { BenefitsModel } from '../../models/Benefit.model';

@Component({
  selector: 'ngx-benefits-add',
  templateUrl: './benefits-add.component.html',
  styleUrls: ['./benefits-add.component.scss'],
})
export class BenefitsAddComponent implements OnInit {
  addBenefitForm: FormGroup;
  title: string; // Ajoutez cette ligne

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<BenefitsAddComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.addBenefitForm = this.fb.group({
      title: ['', Validators.required],
      benefDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addBenefitForm.valid) {
      if (confirm('Êtes-vous sûr de vouloir ajouter ce bénéfice ?')) {
        this.addBenefit();
      }
    } else {
      this.toastrService.danger('Veuillez remplir tous les champs', 'Erreur');
    }
  }

  addBenefit() {
    const newBenefit: BenefitsModel = this.addBenefitForm.value;
    this.apiService.addBenefit(newBenefit).subscribe(
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
