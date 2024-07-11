import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../../@core/data/solar';
import {ApiService} from '../services/api-service.service';
import {DemoModel} from '../Models/DemoModel';
import {BenefitsModel} from '../Models/BenefitsModel';
import {id} from '@swimlane/ngx-charts';
import {LimitsModel} from '../Models/LimitsModel';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {DemoUpdateComponent} from './demo-update/demo-update.component';
import {LimitsUpdateComponent} from './limits-update/limits-update.component';
import {BenifitsUpdateComponent} from './benifits-update/benifits-update.component';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {StepsModel} from '../Models/stepsModel';
import {StepsUpdateComponent} from './steps/steps-update/steps-update.component';
import {StepCreateComponent} from './steps/step-create/step-create.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {NewsModel} from '../Models/NewsModel';
import {NewsUpdateComponent} from './news-update/news-update.component';
import {LimitssAddComponent} from './limitss-add/limitss-add.component';
import {BenefitsAddComponent} from './benefits-add/benefits-add.component';
import {IntroUpdateComponent} from './intro-update/intro-update.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;

}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './scrum-poker-g2-demo.component.html',
  styleUrls: ['./scrum-poker-g2-demo.component.scss'],
})
export class ScrumPokerG2DemoComponent implements OnInit {
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  news: NewsModel[] = [];
  steps: StepsModel[] = [];
  step: StepsModel;
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;

  constructor(
    private apiService: ApiService,
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

    this.apiService.getNews().subscribe((news: NewsModel[]) => {
      this.news = news;
    });
    this.apiService.getSteps().subscribe((steps: StepsModel[]) => {
      this.steps = steps;
    });
  }

  openBenefitsUpdate(benefit: BenefitsModel) {
    this.dialogService.open(BenifitsUpdateComponent, {
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

  openIntroUpdate() {
    this.dialogService.open(IntroUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component' ,
      },
    }).onClose.subscribe(() => this.loadData());
  }
  openStep(step: StepsModel) {
    this.dialogService.open(StepsUpdateComponent, {
      context: {
        title: 'Update Step',
        step: { ...step },
      },
    }).onClose.subscribe(() => this.loadData());
  }
  createStep(step: StepsModel) {
    this.dialogService.open(StepCreateComponent, {
      context: {
        title: 'Create Step',
        step: { ...step },
      },
    }).onClose.subscribe(() => this.loadData());
  }
  deleteDemo( id: string) {
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

  deleteStep(id: string) {
    if (confirm('Are you sure you want to delete this step?')) {
      this.apiService.deleteStep(id).subscribe(
        () => {
          this.steps = this.steps.filter((s) => s.id !== id);
        },
        (error) => {
          console.error('Error deleting the step:', error);
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

  openNewsUpdate(news: NewsModel) {
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
/*
  private alive = true;
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  demo: DemoModel;
  infos: NewsModel[] = [];
  info: NewsModel;
  steps: StepsModel[] = [];
  step: StepsModel;
  news: NewsModel[] = [];
  constructor(private apiService: ApiService, private dialogService: NbDialogService,
              private route: ActivatedRoute, private fb: UntypedFormBuilder) {}

  open() {
    this.dialogService.open(DemoUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
  openLimits() {
    this.dialogService.open(LimitsUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
  openBenifits() {
    this.dialogService.open(BenifitsUpdateComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
  openStep(step: StepsModel) {
    this.dialogService.open(StepsUpdateComponent, {
      context: {
        title: 'Update Step',
        step: { ...step },
      },
    }).onClose.subscribe(() => this.loadData());
  }
  openInfoUpdate(info: NewsModel) {
    this.dialogService.open(NewsUpdateComponent, {
      context: {
        title: 'Update Benefit',
        info: { ...info },
      },
    }).onClose.subscribe(() => this.loadDataInfo());
  }
  createStep(step: StepsModel) {
    this.dialogService.open(StepCreateComponent, {
      context: {
        title: 'Create Step',
        step: { ...step },
      },
    }).onClose.subscribe(() => this.loadData());
  }

/!*  createNews(infos: NewsModel) {
    this.dialogService.open(DemoFormComponent, {
      context: {
        title: 'Create info',
        news: { ...news },
      },
    }).onClose.subscribe(() => this.loadData());
  }*!/
  loadDataInfo() {
    this.apiService.getNews().subscribe((infos: NewsModel[]) => {
      this.infos = infos;
    });
  }


  deleteStep() {
    this.apiService.deleteStep(this.step.id).subscribe(() => {
      this.ngOnInit();
    });
  }
  loadData() {
    this.apiService.getSteps().subscribe((steps: StepsModel[]) => {
      this.steps = steps;
    });
  }


  ngOnInit() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos ;

    this.apiService.getBenefits().subscribe((benefits: BenefitsModel[]) => {
        this.benefits = benefits ;

    this.apiService.getLimits().subscribe((limits: LimitsModel[]) => {
          this.limits = limits ;

    this.apiService.getSteps().subscribe((steps: StepsModel[]) => {
            this.steps = steps ;

    this.apiService.getNews().subscribe((infos: NewsModel[]) => {
        this.infos = infos ;
            });
          });
        });
      });
    });
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

  openNewsUpdate(news: NewsModel) {
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
  }*/
}
