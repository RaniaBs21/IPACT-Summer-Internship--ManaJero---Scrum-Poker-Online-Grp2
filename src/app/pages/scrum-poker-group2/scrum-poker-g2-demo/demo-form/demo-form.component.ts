import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api-service.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {NewsModel} from '../../Models/NewsModel';



@Component({
  selector: 'ngx-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']})

export class DemoFormComponent implements OnInit  {
  addNewForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<DemoFormComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.addNewForm = this.fb.group({
      title: ['', Validators.required],
      newsDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addNewForm.valid) {
      if (confirm('Are you sure you want to add this information?')) {
        this.addBenefit();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addBenefit() {
    const newInfo: NewsModel = this.addNewForm.value;
    this.apiService.addNew(newInfo).subscribe(
      (benefit) => {
        this.toastrService.success('Information added successfully', 'Success');
        this.ref.close(benefit);
      },
      (error) => {
        console.error('Error adding the information:', error);
        this.toastrService.danger('Failed to add the information', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}



