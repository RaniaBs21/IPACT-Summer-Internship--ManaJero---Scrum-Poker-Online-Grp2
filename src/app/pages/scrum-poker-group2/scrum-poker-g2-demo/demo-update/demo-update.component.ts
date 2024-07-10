import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { DemoModel } from '../../models/Demo.model';

@Component({
  selector: 'ngx-demo-update',
  templateUrl: './demo-update.component.html',
  styleUrls: ['./demo-update.component.scss'],
})
export class DemoUpdateComponent implements OnInit {

  demo: DemoModel;
  demos: DemoModel[];

  constructor(
      private route: ActivatedRoute,
      protected ref: NbDialogRef<DemoUpdateComponent>,
      private apiService: PokerService,
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

  onDescriptionChange(demo: DemoModel): void {
    this.demo = demo;
  }

  cancel() {
    this.ref.close();
  }
}
