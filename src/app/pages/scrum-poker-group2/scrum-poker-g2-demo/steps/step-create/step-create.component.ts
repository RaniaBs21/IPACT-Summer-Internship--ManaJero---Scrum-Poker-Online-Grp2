import {Component, Input, OnInit} from '@angular/core';
import {StepsModel} from '../../../Models/stepsModel';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-step-create',
  templateUrl: './step-create.component.html',
  styleUrls: ['./step-create.component.scss']})
export class StepCreateComponent implements OnInit {
  @Input() title: string;
  @Input() step: StepsModel;
  addStepForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<StepCreateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}


  ngOnInit(): void {
    this.addStepForm = this.fb.group({
      title: ['', Validators.required],
      stepDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addStepForm.valid) {
      if (confirm('Are you sure you want to add this step ?')) {
        this.addStep();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addStep() {
    const newStep: StepsModel = this.addStepForm.value;
    this.apiService.addStep(newStep).subscribe(
      (step) => {
        this.toastrService.success('step added successfully', 'Success');
        this.ref.close(step);
      },
      (error) => {
        console.error('Error adding the step:', error);
        this.toastrService.danger('Failed to add the step', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
