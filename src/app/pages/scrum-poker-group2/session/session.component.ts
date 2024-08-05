import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionModel, VotingSystem} from '../models/SessionModel';
import {ApiService} from '../services/api-service.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent  implements OnInit {
  addSessionForm: FormGroup;
  votingSystems = Object.values(VotingSystem);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.addSessionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      votingSystem: [VotingSystem.FIBONACCI, Validators.required],
    });
  }

  confirmAdd() {
    if (this.addSessionForm.valid) {
      if (confirm('Are you sure you want to add this session?')) {
        this.addSession();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addSession() {
    const newSession: SessionModel = this.addSessionForm.value;
    this.apiService.addSession(newSession).subscribe(
      (session) => {
        this.toastrService.success('Session added successfully', 'Success');
        this.addSessionForm.reset(); // Reset form after submission
      },
      (error) => {
        console.error('Error adding the session:', error);
        this.toastrService.danger('Failed to add the session', 'Error');
      },
    );
  }

}
