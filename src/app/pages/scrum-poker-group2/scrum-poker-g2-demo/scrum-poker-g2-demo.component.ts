import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { DemoUpdateComponent } from './demo-update/demo-update.component';
import { LimitsUpdateComponent } from './limits-update/limits-update.component';
import { BenefitsUpdateComponent } from './benefits-update/benefits-update.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DemoModel } from '../models/Demo.model';
import { BenefitsModel } from '../models/Benefit.model';
import { LimitsModel } from '../models/Limit.model';
import { PokerService } from '../services/poker.service';
import {BenefitsAddComponent} from './benefits-add/benefits-add.component';
import {LimitssAddComponent} from './limitss-add/limitss-add.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './scrum-poker-g2-demo.component.html',
  styleUrls: ['./scrum-poker-g2-demo.component.scss'],
})
export class ScrumPokerG2DemoComponent implements OnInit {
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;

  constructor(
    private apiService: PokerService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos;
    });

    this.apiService.getBenefits().subscribe((benefits: BenefitsModel[]) => {
      this.benefits = benefits;
    });

    this.apiService.getLimits().subscribe((limits: LimitsModel[]) => {
      this.limits = limits;
    });
  }

  openDemoUpdate() {
    this.dialogService.open(DemoUpdateComponent, {
      context: {
        title: 'Update Demo',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openBenefitsUpdate(benefit: BenefitsModel) {
    this.dialogService.open(BenefitsUpdateComponent, {
      context: {
        title: 'Update Benefit',
        benefit: { ...benefit },
      },
    }).onClose.subscribe(() => this.loadData());
  }
  openBenefitsAdd() {
    this.dialogService.open(BenefitsAddComponent, {
      context: {
        title: 'Add Benefit',
      },
    }).onClose.subscribe(() => this.loadData());
  }


  openLimitsAdd() {
    this.dialogService.open(LimitssAddComponent, {
      context: {
        title: 'Add Limit ',
      },
    }).onClose.subscribe(() => this.loadData());
  }
  openLimitsUpdate(limit: LimitsModel) {
    this.dialogService.open(LimitsUpdateComponent, {
      context: {
        title: 'Update Limits',
        limit: { ...limit },

      },
    }).onClose.subscribe(() => this.loadData());
  }

  open() {
    this.dialogService.open(DemoUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  deleteDemo(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette démo ?')) {
      this.apiService.deleteDemo(id).subscribe(
        () => {
          this.demos = this.demos.filter((d) => d.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la démo :', error);
        },
      );
    }
  }

  deleteBenefit(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bénéfice ?')) {
      this.apiService.deleteBenefit(id).subscribe(
        () => {
          this.benefits = this.benefits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du bénéfice :', error);
        },
      );
    }
  }

  deleteLimit(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce limit ?')) {
      this.apiService.deleteLimit(id).subscribe(
        () => {
          this.limits = this.limits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du limit :', error);
        },
      );
    }
  }
}
