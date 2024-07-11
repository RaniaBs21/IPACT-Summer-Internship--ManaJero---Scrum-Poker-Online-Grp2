import {Component, Input, OnInit} from '@angular/core';
import {DemoModel} from '../../Models/DemoModel';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';

@Component({
  selector: 'ngx-intro-update',
  templateUrl: './intro-update.component.html',
  styleUrls: ['./intro-update.component.scss']})
export class IntroUpdateComponent  implements OnInit {
  demo: DemoModel;
  demos: DemoModel[];

  constructor(
    private route: ActivatedRoute,
    protected ref: NbDialogRef<IntroUpdateComponent>,
    private apiService: ApiService,
    private router: Router,
    private toastrService: NbToastrService,

  ) {}

  ngOnInit() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos;
    });
  }

  @Input() title: string;

  confirmUpdate() {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ?')) {
      this.updateDemo();
    }
  }

  updateDemo() {
    this.apiService.updateDemo(this.demo.id, this.demo).subscribe(updatedDemo => {
      const index = this.demos.findIndex(d => d.id === updatedDemo.id);
      if (index !== -1) {
        this.demos[index] = updatedDemo;
        this.toastrService.success('Bénéfice mis à jour avec succès', 'Succès');

      }

      this.ref.close();

      this.router.navigate(['/pages/agile/scrum-poker-group2']);
    }, error => {
      console.error('Error updating project:', error);
    });
  }

  onIntroChange(demo: DemoModel): void {
    this.demo = demo;
  }
  onTitleChange(demo: DemoModel): void {
    this.demo = demo;
  }
  cancel() {
    this.ref.close();
  }
}
