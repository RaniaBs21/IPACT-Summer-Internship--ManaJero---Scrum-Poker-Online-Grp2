import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoModel} from '../Models/DemoModel';
import {BenefitsModel} from '../Models/BenefitsModel';
import {LimitsModel} from '../Models/LimitsModel';
import {StepsModel} from '../Models/stepsModel';

@Injectable({providedIn: 'root'})
export class ApiService {

  readonly API_URL = 'http://localhost:8082';
  readonly ENDPOINT_DEMO = '/getDemo' ;
  readonly ENDPOINT_Benefits = '/getBenefits' ;
  readonly ENDPOINT_Limits = '/getLimits' ;
  readonly ENDPOINT_Demo_update = '/updateDemo/' ;
  readonly ENDPOINT_Benefits_update = '/updateBenefits/' ;
  readonly ENDPOINT_Limits_update = '/updateLimits/' ;
  readonly ENDPOINT_Demo_Create = '/adddemo' ;
  readonly ENDPOINT_Steps = '/getSteps' ;
  readonly ENDPOINT_Steps_by_Id = '/getSteps:' ;

  readonly ENDPOINT_Steps_update = '/updateStep/' ;

  constructor(private httpClient: HttpClient) { }
  // Demo services
  addDemo(demo: DemoModel): Observable<DemoModel[]> {
    return this.httpClient.post<DemoModel[]>(this.API_URL + this.ENDPOINT_Demo_Create, demo);
  }
  getDemo(): Observable<DemoModel[]> {
    return this.httpClient.get<DemoModel[]>(this.API_URL + this.ENDPOINT_DEMO);
  }
  updateDemo ( id: string, demo: DemoModel): Observable<DemoModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Demo_update}${id}`;
    return this.httpClient.put<DemoModel>( url, demo );
  }
  // benefits services
  getBenefits(): Observable<BenefitsModel[]> {
    return this.httpClient.get<BenefitsModel[]>(this.API_URL + this.ENDPOINT_Benefits);
  }
  updateBenifits ( id: string, benefits: BenefitsModel): Observable<BenefitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Benefits_update}${id}`;
    return this.httpClient.put<BenefitsModel>( url, benefits );
  }

  // limits services
  getLimits(): Observable<LimitsModel[]> {
    return this.httpClient.get<LimitsModel[]>(this.API_URL + this.ENDPOINT_Limits);
  }

  updateLimits ( idL: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Limits_update}${idL}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
// steps services

  getSteps(): Observable<StepsModel[]> {
    return this.httpClient.get<StepsModel[]>(this.API_URL + this.ENDPOINT_Steps);
  }
  updateStep ( id: string, step: StepsModel): Observable<StepsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Steps_update}${id}`;
    return this.httpClient.put<StepsModel>( url, step );
  }

  getStepById(id: number): Observable<StepsModel[]> {
    const url = `${this.API_URL}${this.ENDPOINT_Steps_by_Id}${id}`;
    return this.httpClient.get<StepsModel[]>(url);
  }
}
