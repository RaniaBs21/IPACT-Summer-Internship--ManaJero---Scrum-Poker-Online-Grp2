import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';
import {DiagramModel} from '../../../Models/DiagramModel';
import {UserModel} from '../../../Models/UserModel';
import {IssuesModel} from '../../../Models/IssuesModel';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionModel} from '../../../Models/SessionModel';

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

  ) {
  }

  ngOnInit(): void {
    if (this.ref.componentRef.instance['sessionId']) {
      this.sessionId = this.ref.componentRef.instance['sessionId'];
    } else {
      this.sessionId = this.route.snapshot.paramMap.get('Id');
    }
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  confirmAdd() {
    if (this.addUserForm.valid) {
      if (confirm('Are you sure you want to play this session ?')) {
        this.addUser();
      } else {
        this.toastrService.danger('Please fill in all fields', 'Error');
      }
    }}

  addUser() {
    const newUser: UserModel = this.addUserForm.value;
    this.apiService.addUser(this.sessionId, newUser).subscribe(
        (user) => {
          this.users.push(user);
          this.toastrService.success('welcome to the session', 'Success');
          // window.location.reload();
          this.ref.close(user);

        },
        (error) => {
          console.error('can not play this game :', error);
          this.toastrService.danger('can not play this game ', 'Error');
        },
    );
  }
  cancel() {
    this.ref.close();
  }
}
