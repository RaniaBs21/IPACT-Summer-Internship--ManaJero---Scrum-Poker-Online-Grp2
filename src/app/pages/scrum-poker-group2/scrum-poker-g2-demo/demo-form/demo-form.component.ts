import {Component} from '@angular/core';
import {ApiService} from '../../services/api-service.service';
import {DemoModel} from '../../Models/DemoModel';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';



@Component({
  selector: 'ngx-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']})

export class DemoFormComponent  {

  demoForm: FormGroup;
  title = 'my-angular-app';
  demo: DemoModel;
  constructor(private apiService: ApiService, private route: Router) {}

  addDemo(): void {
    this.apiService.addDemo(this.demo).subscribe(response => {
       this.route.navigateByUrl('/agile/scrum-poker-group2');
    }, error => {
      console.error('Error adding demo');
    });
  }
}



