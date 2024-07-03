import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestModel} from '../Models/Test.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {

  readonly API_URL = 'http://localhost:8082';
  readonly ENDPOINT_CARS = '/getTest' ;
  constructor(private httpClient: HttpClient) { }
  getTest(): Observable<TestModel[]> {
    return this.httpClient.get<TestModel[]>(this.API_URL + this.ENDPOINT_CARS);
  }

}
