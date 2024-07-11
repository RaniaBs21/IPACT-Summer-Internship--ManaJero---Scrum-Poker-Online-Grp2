import {Component, Input, OnInit} from '@angular/core';
import {DemoModel} from '../../Models/DemoModel';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogRef} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';
import {LimitsModel} from '../../Models/LimitsModel';

@Component({
  selector: 'ngx-limits-update',
  templateUrl: './limits-update.component.html',
  styleUrls: ['./limits-update.component.scss'],
})
export class LimitsUpdateComponent implements OnInit {
  limit: LimitsModel;
  limits: LimitsModel[];

  constructor(private route: ActivatedRoute,
              protected ref: NbDialogRef<LimitsUpdateComponent>,
              private apiService: ApiService,
              private router: Router) {}

  ngOnInit() {
    this.apiService.getLimits().subscribe((limits: LimitsModel[]) => {
      this.limits = limits ;
    });
  }

  @Input() title: string;
  updateLimits() {
    this.apiService.updateLimits(this.limit.id, this.limit).subscribe(updatelimit => {
      this.router.navigate(['/pages/agile/scrum-poker-group2']);
    }, error => {
      console.error('Error updating project:', error);
    });

  }

  onDescriptionChange(limit: LimitsModel): void {
    this.limit = limit;
  }
  dismiss() {
    this.ref.close();
  }
}
