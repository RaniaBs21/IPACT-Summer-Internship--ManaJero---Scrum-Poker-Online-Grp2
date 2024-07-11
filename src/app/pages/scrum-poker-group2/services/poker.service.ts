import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoModel} from '../models/Demo.model';
import {BenefitsModel} from '../models/Benefit.model';
import {LimitsModel} from '../models/Limit.model';
import {NewModel} from '../models/New.model';

@Injectable({
  providedIn: 'root'})
export class PokerService {

  readonly API_URL = 'http://localhost:8083';
  readonly ENDPOINT_DEMO = '/getDemo' ;
  readonly ENDPOINT_Benefits = '/getBenefits' ;
  readonly ENDPOINT_Limits = '/getLimits' ;
  readonly ENDPOINT_News = '/getNews' ;
  readonly ENDPOINT_Demo_update = '/updateDemo/' ;
  readonly ENDPOINT_Benefits_update = '/updateBenefit/' ;
  readonly ENDPOINT_Limits_update = '/updateLimit/' ;
  readonly ENDPOINT_News_update = '/updateNew/' ;


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

  addLimit(limit: LimitsModel): Observable<LimitsModel> {
    return this.httpClient.post<LimitsModel>(`${this.API_URL}/addLimits`, limit);
  }

  updateLimits ( id: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Limits_update}${id}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
  deleteLimit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletelimit/${id}`);
  }
  getNews(): Observable<NewModel[]> {
    return this.httpClient.get<NewModel[]>(this.API_URL + this.ENDPOINT_News);
  }
  addNew(news: NewModel): Observable<NewModel> {
    return this.httpClient.post<NewModel>(`${this.API_URL}/addNews`, news);
  }
  updateNews ( id: string, news: NewModel): Observable<NewModel> {
    const url = `${this.API_URL}${this.ENDPOINT_News_update}${id}`;
    return this.httpClient.put<NewModel>( url, news );
  }
  deleteNew(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteNews/${id}`);
  }

}
