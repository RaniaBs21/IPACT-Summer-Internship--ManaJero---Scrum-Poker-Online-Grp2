import {Component, OnInit} from '@angular/core';
import {UserModel} from './model/UserModel';
import {UserService} from '../../../@core/mock/users.service';
import {DemoService} from './service/demo.service';

@Component({
  selector: 'ngx-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
})
export class FormDemoComponent implements OnInit {
  users: UserModel[] = [];
  newUser: UserModel;

  constructor(private userService: DemoService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }


}
