import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../services/api-service.service';
import { UserModel } from '../../../Models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionModel } from '../../../Models/SessionModel';

@Component({
  selector: 'ngx-user-pseudo',
  templateUrl: './user-pseudo.component.html',
  styleUrls: ['./user-pseudo.component.scss'],
})
export class UserPseudoComponent implements OnInit {
  sessionId: string | null = null;
  addUserForm: FormGroup;
  name: string;
  users: UserModel[] = [];
  session: SessionModel;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<UserPseudoComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sessionId = this.ref.componentRef.instance['sessionId'] || this.route.snapshot.paramMap.get('Id');

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addUserForm.valid) {
      if (confirm('Are you sure you want to play this session?')) {
        this.addUser();
      } else {
        this.toastrService.danger('Please fill in all fields', 'Error');
      }
    }
  }

  addUser() {
    const newUser: UserModel = this.addUserForm.value;

    this.apiService.addUser(this.sessionId, newUser).subscribe(
      (user: UserModel) => {
        this.users.push(user);
        this.toastrService.success('Welcome to the session', 'Success');
        this.ref.close(user);
        this.storeUserId(user.id); // Stocke le userId pour les futurs votes
        window.location.reload();
      },
      (error) => {
        console.error('Cannot play this game:', error);
        this.toastrService.danger('Cannot play this game', 'Error');
      },
    );
  }

  storeUserId(userId: string) {
    localStorage.setItem('userId', userId); // Stocke le userId dans le localStorage
  }

  cancel() {
    this.ref.close();
  }
}
