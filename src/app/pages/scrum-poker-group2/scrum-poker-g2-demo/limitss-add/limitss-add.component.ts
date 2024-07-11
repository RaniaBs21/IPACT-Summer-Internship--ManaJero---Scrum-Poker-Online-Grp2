import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';
import { LimitsModel } from '../../models/Limit.model';

@Component({
  selector: 'ngx-limitss-add',
  templateUrl: './limitss-add.component.html',
  styleUrls: ['./limitss-add.component.scss'],
})
export class LimitssAddComponent implements OnInit {
  addLimitForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<LimitssAddComponent>,
    private apiService: PokerService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.addLimitForm = this.fb.group({
      title: ['', Validators.required],
      limitDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addLimitForm.valid) {
      if (confirm('Are you sure you want to add this limit?')) {
        this.addLimit();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addLimit() {
    const newLimit: LimitsModel = this.addLimitForm.value;
    this.apiService.addLimit(newLimit).subscribe(
      (limit) => {
        this.toastrService.success('Limit added successfully', 'Success');
        this.ref.close(limit);
      },
      (error) => {
        console.error('Error adding the limit:', error);
        this.toastrService.danger('Failed to add the limit', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
