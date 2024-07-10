import {Component, Input, OnInit} from '@angular/core';
import {DemoModel} from '../../Models/DemoModel';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';
@Component({
  selector: 'ngx-demo-update',
  templateUrl: './demo-update.component.html',
  styleUrls: ['./demo-update.component.scss']})

export class DemoUpdateComponent implements OnInit {

  demo: DemoModel;
  demos: DemoModel[];

  constructor(private route: ActivatedRoute,
              protected ref: NbDialogRef<DemoUpdateComponent>,
              private apiService: ApiService,
              private router: Router) {}

  ngOnInit() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos ;
    });
  }

  @Input() title: string;
   updateDemo() {
        this.apiService.updateDemo(this.demo.id, this.demo).subscribe(updatedemo => {
          this.router.navigate(['/pages/agile/scrum-poker-group2']);
        }, error => {
          console.error('Error updating project:', error);
        });

}

  onDescriptionChange(demo: DemoModel): void {
    this.demo = demo;
  }
  onIntroChange(demo: DemoModel): void {
    this.demo = demo;
  }
  dismiss() {
    this.ref.close();
  }
}
