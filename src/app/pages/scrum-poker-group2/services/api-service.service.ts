import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestModel} from '../Models/Test.model';
import {Observable} from 'rxjs';
import {DemoModel} from '../Models/DemoModel';
import {BenefitsModel} from '../Models/BenefitsModel';
import {LimitsModel} from '../Models/LimitsModel';

@Injectable({providedIn: 'root'})
export class ApiService {

  readonly API_URL = 'http://localhost:8082';
  readonly ENDPOINT_CARS = '/getTest' ;
  readonly ENDPOINT_DEMO = '/getDemo' ;
  readonly ENDPOINT_Benefits = '/getBenefits' ;
  readonly ENDPOINT_Limits = '/getLimits' ;
  readonly ENDPOINT_Demo_update = '/updateDemo/' ;
  readonly ENDPOINT_Benefits_update = '/updateBenefits/' ;
  readonly ENDPOINT_Limits_update = '/updateLimits/' ;

  constructor(private httpClient: HttpClient) { }
  getTest(): Observable<TestModel[]> {
    return this.httpClient.get<TestModel[]>(this.API_URL + this.ENDPOINT_CARS);
  }
  getDemo(): Observable<DemoModel[]> {
    return this.httpClient.get<DemoModel[]>(this.API_URL + this.ENDPOINT_DEMO);
  }

  getBenefits(): Observable<BenefitsModel[]> {
    return this.httpClient.get<BenefitsModel[]>(this.API_URL + this.ENDPOINT_Benefits);
  }
  getLimits(): Observable<LimitsModel[]> {
    return this.httpClient.get<LimitsModel[]>(this.API_URL + this.ENDPOINT_Limits);
  }
  updateDemo ( id: number, demo: DemoModel): Observable<DemoModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Demo_update}${id}`;
    return this.httpClient.put<DemoModel>( url, demo );
  }
  updateBenifits ( idB: number, benefits: BenefitsModel): Observable<BenefitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Benefits_update}${idB}`;
    return this.httpClient.put<BenefitsModel>( url, benefits );
  }
  updateLimits ( idL: number, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Limits_update}${idL}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }

}
