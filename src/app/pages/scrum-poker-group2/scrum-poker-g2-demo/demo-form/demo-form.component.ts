import {Component, Input} from '@angular/core';
import {ApiService} from '../../services/api-service.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {InfoModel} from '../../Models/InfoModel';



@Component({
  selector: 'ngx-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']})

export class DemoFormComponent  {

  demoForm: FormGroup;
  @Input() title: string;
  @Input() infos: InfoModel;

  constructor(protected ref: NbDialogRef<DemoFormComponent>,
              private apiService: ApiService,
              private toastrService: NbToastrService) {}


  addNews(infos: InfoModel) {
    this.apiService.addNews(infos).subscribe(
      (addNews) => {
        this.toastrService.success('Demo added succesfuly', 'Succès');
        this.ref.close();
      },
      (error) => {
        console.error('Error :', error);
        this.toastrService.danger('Error', 'Erreur');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}



