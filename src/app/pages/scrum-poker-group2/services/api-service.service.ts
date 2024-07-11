import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoModel} from '../Models/DemoModel';
import {BenefitsModel} from '../Models/BenefitsModel';
import {LimitsModel} from '../Models/LimitsModel';
import {StepsModel} from '../Models/stepsModel';
import {InfoModel} from '../Models/InfoModel';
import {DiagramModel} from '../Models/DiagramModel';

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
  readonly ENDPOINT_delete_step = '/deleteStep:' ;
  readonly ENDPOINT_Steps_update = '/updateStep/' ;
  readonly ENDPOINT_Step_Create = '/addSteps' ;
  readonly ENDPOINT_News_Create = '/addNews' ;
  readonly ENDPOINT_News = '/getNews' ;
  readonly ENDPOINT_News_update = '/updateNew/';
  readonly ENDPOINT_diagram = '/getDiagrams' ;
  readonly ENDPOINT_diagram_update = '/updateDiagram/' ;
  readonly ENDPOINT_delete_diagram = '/deleteDiagram:' ;



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

  updateLimits ( id: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Limits_update}${id}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
// steps services
  addStep(step: StepsModel): Observable<StepsModel[]> {
    return this.httpClient.post<StepsModel[]>(this.API_URL + this.ENDPOINT_Step_Create, step);
  }
  getSteps(): Observable<StepsModel[]> {
    return this.httpClient.get<StepsModel[]>(this.API_URL + this.ENDPOINT_Steps);
  }
  updateStep ( id: string, step: StepsModel): Observable<StepsModel> {
    const url = `${this.API_URL}${this.ENDPOINT_Steps_update}${id}`;
    return this.httpClient.put<StepsModel>( url, step );
  }
  deleteStep(id: string): Observable<void> {
    const url = `${this.API_URL}${this.ENDPOINT_delete_step}${id}`;
    return this.httpClient.delete<void>(url);
  }

  // News services
  addNews(infos: InfoModel): Observable<InfoModel[]> {
    return this.httpClient.post<InfoModel[]>(this.API_URL + this.ENDPOINT_News_Create, infos);
  }
  getNews(): Observable<InfoModel[]> {
    return this.httpClient.get<InfoModel[]>(this.API_URL + this.ENDPOINT_News);
  }
  updateNews ( id: string, info: InfoModel): Observable<InfoModel> {
    const url = `${this.API_URL}${this.ENDPOINT_News_update}${id}`;
    return this.httpClient.put<InfoModel>( url, info );
  }
  // diagram service
  addDiagram(digram: DiagramModel): Observable<DiagramModel> {
    return this.httpClient.post<DiagramModel>(`${this.API_URL}/addDiagram`, digram);
  }
  getDiagram(): Observable<DiagramModel[]> {
    return this.httpClient.get<DiagramModel[]>(this.API_URL + this.ENDPOINT_diagram);
  }
  updateDiagram ( id: string, diagram: DiagramModel): Observable<DiagramModel> {
    const url = `${this.API_URL}${this.ENDPOINT_diagram_update}${id}`;
    return this.httpClient.put<DiagramModel>( url, diagram );
  }
  deleteDiagram(id: string): Observable<void> {
    const url = `${this.API_URL}${this.ENDPOINT_delete_diagram}${id}`;
    return this.httpClient.delete<void>(url);
  }
}
