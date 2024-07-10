import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoModel} from '../models/Demo.model';
import {BenefitsModel} from '../models/Benefit.model';
import {LimitsModel} from '../models/Limit.model';

@Injectable({
  providedIn: 'root'})
export class PokerService {

  readonly API_URL = 'http://localhost:8083';
  readonly ENDPOINT_DEMO = '/getDemo' ;
  readonly ENDPOINT_Benefits = '/getBenefits' ;
  readonly ENDPOINT_Limits = '/getLimits' ;
  readonly ENDPOINT_Demo_update = '/updateDemo/' ;
  readonly ENDPOINT_Benefits_update = '/updateBenefit/' ;
  readonly ENDPOINT_Limits_update = '/updateLimit/' ;

  constructor(private httpClient: HttpClient) { }

  getDemo(): Observable<DemoModel[]> {
    return this.httpClient.get<DemoModel[]>(this.API_URL + this.ENDPOINT_DEMO);
  }

  getBenefits(): Observable<BenefitsModel[]> {
    return this.httpClient.get<BenefitsModel[]>(this.API_URL + this.ENDPOINT_Benefits);
  }
  getLimits(): Observable<LimitsModel[]> {
    return this.httpClient.get<LimitsModel[]>(this.API_URL + this.ENDPOINT_Limits);
  }
  updateDemo ( id: string, demo: DemoModel): Observable<DemoModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Demo_update}${id}`;
    return this.httpClient.put<DemoModel>( url, demo );
  }
  deleteDemo(id: string) {
    return this.httpClient.delete<void>(`${this.API_URL}/deletedemo/${id}`);
  }
  addBenefit(benefit: BenefitsModel): Observable<BenefitsModel> {
    return this.httpClient.post<BenefitsModel>(`${this.API_URL}/addBenefits`, benefit);
  }
  updateBenifits ( id: string, benefits: BenefitsModel): Observable<BenefitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Benefits_update}${id}`;
    return this.httpClient.put<BenefitsModel>( url, benefits );
  }

  deleteBenefit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletebenefit/${id}`);
  }
  updateLimits ( id: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Limits_update}${id}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
  deleteLimit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletelimit/${id}`);
  }
}
