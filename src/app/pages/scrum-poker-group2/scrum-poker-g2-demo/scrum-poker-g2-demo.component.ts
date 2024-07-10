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
import {InfoModel} from '../Models/InfoModel';
import {NewsUpdateComponent} from './news-update/news-update.component';

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

  private alive = true;
  demos: DemoModel[] = [];
  benefits: BenefitsModel[] = [];
  limits: LimitsModel[] = [];
  demo: DemoModel;
  infos: InfoModel[] = [];
  info: InfoModel;
  steps: StepsModel[] = [];
  step: StepsModel;
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
  openInfoUpdate(info: InfoModel) {
    this.dialogService.open(NewsUpdateComponent, {
      context: {
        title: 'Update Benefit',
        info: { ...info },
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

  createNews(infos: InfoModel) {
    this.dialogService.open(DemoFormComponent, {
      context: {
        title: 'Create info',
        infos: { ...infos },
      },
    }).onClose.subscribe(() => this.loadData());
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

    this.apiService.getNews().subscribe((infos: InfoModel[]) => {
        this.infos = infos ;
            });
          });
        });
      });
    });
  }
}
