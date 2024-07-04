import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../@core/data/users';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/UserModel';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  readonly API_URL =  'http://localhost:8083';
  readonly ENDPOINT_CARS = '/api/users';
  constructor(private http: HttpClient) { }


}
