import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../../@core/data/solar';
import {TestModel} from '../Models/Test.model';
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
  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
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
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos ;

    this.apiService.getBenefits().subscribe((benefits: BenefitsModel[]) => {
        this.benefits = benefits ;

      this.apiService.getLimits().subscribe((limits: LimitsModel[]) => {
        this.limits = limits ;
      });
      });
    });
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


}
