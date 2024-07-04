import {Component, OnInit} from '@angular/core';
import {TestModel} from '../../Models/Test.model';
import {ApiService} from '../../services/api-service.service';



@Component({
  selector: 'ngx-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']})

export class DemoFormComponent implements OnInit {


  title = 'my-angular-app';
  tests: TestModel[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTest().subscribe((tests: TestModel[]) => {
      this.tests = tests ;
    });
  }


  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
}



