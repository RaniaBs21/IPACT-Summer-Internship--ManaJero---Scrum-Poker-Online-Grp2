import {Component, Input, OnInit} from '@angular/core';
import {BenefitsModel} from '../../Models/BenefitsModel';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogRef} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';
@Component({
  selector: 'ngx-benifits-update',
  templateUrl: './benifits-update.component.html',
  styleUrls: ['./benifits-update.component.scss'],
})
export class BenifitsUpdateComponent implements OnInit {
  benefit: BenefitsModel;
  benefits: BenefitsModel[];

  constructor(private route: ActivatedRoute,
              protected ref: NbDialogRef<BenifitsUpdateComponent>,
              private apiService: ApiService,
              private router: Router) {}

  ngOnInit() {
    this.apiService.getBenefits().subscribe((benefits: BenefitsModel[]) => {
      this.benefits = benefits ;
    });
  }

  @Input() title: string;
  updateBenefits() {
    this.apiService.updateBenifits(this.benefit.idB, this.benefit).subscribe(updatebenefit => {
      this.router.navigate(['/pages/agile/scrum-poker-group2']);
    }, error => {
      console.error('Error updating project:', error);
    });
  }

  onDescriptionChange(benefit: BenefitsModel): void {
    this.benefit = benefit;
  }
  dismiss() {
    this.ref.close();
  }

}
