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
import { BenefitsAddComponent } from './benefits-add/benefits-add.component';
import { LimitssAddComponent } from './limitss-add/limitss-add.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { NewModel } from '../models/New.model';
import { NewsUpdateComponent } from './news-update/news-update.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './scrum-poker-g2-demo.component.html',
  styleUrls: ['./scrum-poker-g2-demo.component.scss'],
})
export class ScrumPokerG2DemoComponent implements OnInit {
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  news: NewModel[] = [];
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

    this.apiService.getNews().subscribe((news: NewModel[]) => {
      this.news = news;
    });
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
        title: 'Add Limit',
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

  deleteDemo(id: string) {
    if (confirm('Are you sure you want to delete this demo?')) {
      this.apiService.deleteDemo(id).subscribe(
        () => {
          this.demos = this.demos.filter((d) => d.id !== id);
        },
        (error) => {
          console.error('Error deleting the demo:', error);
        },
      );
    }
  }

  deleteBenefit(id: string) {
    if (confirm('Are you sure you want to delete this benefit?')) {
      this.apiService.deleteBenefit(id).subscribe(
        () => {
          this.benefits = this.benefits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the benefit:', error);
        },
      );
    }
  }

  deleteLimit(id: string) {
    if (confirm('Are you sure you want to delete this limit?')) {
      this.apiService.deleteLimit(id).subscribe(
        () => {
          this.limits = this.limits.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the limit:', error);
        },
      );
    }
  }

  openNewsAdd() {
    this.dialogService.open(DemoFormComponent, {
      context: {
        title: 'Add Information',
      },
    }).onClose.subscribe(() => this.loadData());
  }

  openNewsUpdate(news: NewModel) {
    this.dialogService.open(NewsUpdateComponent, {
      context: {
        title: 'Update Information',
        news: { ...news },
      },
    }).onClose.subscribe(() => this.loadData());
  }

  deleteNew(id: string) {
    if (confirm('Are you sure you want to delete this information?')) {
      this.apiService.deleteNew(id).subscribe(
        () => {
          this.news = this.news.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the information:', error);
        },
      );
    }
  }
}
