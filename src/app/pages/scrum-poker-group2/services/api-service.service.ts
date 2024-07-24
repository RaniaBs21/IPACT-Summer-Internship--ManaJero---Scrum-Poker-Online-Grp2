import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DemoModel} from '../Models/DemoModel';
import {BenefitsModel} from '../Models/BenefitsModel';
import {LimitsModel} from '../Models/LimitsModel';
import {StepsModel} from '../Models/stepsModel';
import {NewsModel} from '../Models/NewsModel';
import {DiagramModel} from '../Models/DiagramModel';
import {SessionModel} from '../Models/SessionModel';
import {IssuesModel} from '../Models/IssuesModel';

@Injectable({providedIn: 'root'})
export class ApiService {

  readonly API_URL = 'http://localhost:8082';
  // readonly ENDPOINT_DEMO = '/getDemo' ;
 // readonly ENDPOINT_Benefits = '/getBenefits' ;
 // readonly ENDPOINT_Limits = '/getLimits' ;
  // readonly ENDPOINT_Demo_update = '/updateDemo/' ;
 // readonly ENDPOINT_Benefits_update = '/updateBenefits/' ;
 // readonly ENDPOINT_Limits_update = '/updateLimits/' ;
  // readonly ENDPOINT_Demo_Create = '/adddemo' ;
 // readonly ENDPOINT_Steps = '/getSteps' ;
  // readonly ENDPOINT_Steps_by_Id = '/getSteps' ;
 // readonly ENDPOINT_delete_step = '/deleteStep/' ;
  // readonly ENDPOINT_Steps_update = '/updateStep/' ;
 // readonly ENDPOINT_Step_Create = '/addSteps' ;
 // readonly ENDPOINT_News_Create = '/addNews' ;
 // readonly ENDPOINT_News = '/getNews' ;
 // readonly ENDPOINT_News_update = '/updateNew/' ;



  constructor(private httpClient: HttpClient) { }

  // ********************* Demo services ************************
  addDemo(demo: DemoModel): Observable<DemoModel[]> {
    return this.httpClient.post<DemoModel[]>(`${this.API_URL}/adddemo`, demo);
  }
  getDemo(): Observable<DemoModel[]> {
    return this.httpClient.get<DemoModel[]>(`${this.API_URL}/getDemo`);
  }
  updateDemo ( id: string, demo: DemoModel): Observable<DemoModel> {
    const url = `${this.API_URL}/updateDemo/${id}`;
    return this.httpClient.put<DemoModel>( url, demo );
  }
  deleteDemo(id: string) {
    return this.httpClient.delete<void>(`${this.API_URL}/deletedemo/${id}`);
  }

  // ************** benefits services *******************
  addBenefit(benefit: BenefitsModel): Observable<BenefitsModel> {
    return this.httpClient.post<BenefitsModel>(`${this.API_URL}/addBenefits`, benefit);
  }
  updateBenifits ( id: string, benefits: BenefitsModel): Observable<BenefitsModel> {
    const url = `${this.API_URL}/updateBenefit/${id}`;
    return this.httpClient.put<BenefitsModel>( url, benefits );
  }

  deleteBenefit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletebenefit/${id}`);
  }

  getBenefits(): Observable<BenefitsModel[]> {
    return this.httpClient.get<BenefitsModel[]>(`${this.API_URL}/getBenefits`);
  }


  // ********************** limits services ***********************
  addLimit(limit: LimitsModel): Observable<LimitsModel> {
    return this.httpClient.post<LimitsModel>(`${this.API_URL}/addLimits`, limit);
  }
  getLimits(): Observable<LimitsModel[]> {
    return this.httpClient.get<LimitsModel[]>(`${this.API_URL}/getLimits`);
  }

  updateLimits ( id: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}/updateLimit/${id}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
  deleteLimit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletelimit/${id}`);
  }


// ************************ steps services ****************************
  addStep(step: StepsModel): Observable<StepsModel[]> {
    return this.httpClient.post<StepsModel[]>(`${this.API_URL}/addSteps`, step);
  }
  getSteps(): Observable<StepsModel[]> {
    return this.httpClient.get<StepsModel[]>(`${this.API_URL}/getSteps`);
  }
  updateStep ( id: string, step: StepsModel): Observable<StepsModel> {
    const url = `${this.API_URL}/updateStep/${id}`;
    return this.httpClient.put<StepsModel>( url, step );
  }
  deleteStep(id: string): Observable<void> {
    const url = `${this.API_URL}/deleteStep/${id}`;
    return this.httpClient.delete<void>(url);
  }



  // ******************* News services ******************************
  addNew(news: NewsModel): Observable<NewsModel[]> {
    return this.httpClient.post<NewsModel[]>(`${this.API_URL}/addNews`, news);
  }
  getNews(): Observable<NewsModel[]> {
    return this.httpClient.get<NewsModel[]>(`${this.API_URL}/getNews`);
  }
  updateNews ( id: string, news: NewsModel): Observable<NewsModel> {
    const url = `${this.API_URL}/updateNew/${id}`;
    return this.httpClient.put<NewsModel>( url, news );
  }
  deleteNew(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteNews/${id}`);
  }

  // ********************** Diagram services ***********************
  addDiagram(diagram: DiagramModel): Observable<DiagramModel> {
    return this.httpClient.post<DiagramModel>(`${this.API_URL}/addDiagram`, diagram);
  }
  getDiagrams(): Observable<DiagramModel[]> {
    return this.httpClient.get<DiagramModel[]>(`${this.API_URL}/getDiagrams`);
  }

  updateDiagram ( id: string, diagrams: DiagramModel): Observable<DiagramModel> {
    const url = `${this.API_URL}/updateDiagram/${id}`;
    return this.httpClient.put<DiagramModel>( url, diagrams );
  }
  deleteDiagram(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteDiagram/${id}`);
  }

  // ********************** Session services ***********************

  addSession(session: SessionModel): Observable<SessionModel> {
    return this.httpClient.post<SessionModel>(`${this.API_URL}/addSession`, session);
  }
  getSession(id: string): Observable<SessionModel> {
    return this.httpClient.get<SessionModel>(`${this.API_URL}/getSession/${id}`);
  }

  // ********************** Issues services ***********************
  addIssue(sessionId: string, issue: IssuesModel): Observable<IssuesModel> {
    return this.httpClient.post<IssuesModel>(`${this.API_URL}/session/${sessionId}`, issue);
  }
  getIssuesBySessionId(sessionId: string): Observable<IssuesModel[]> {
    return this.httpClient.get<IssuesModel[]>(`${this.API_URL}/session/${sessionId}`);
  }
  updateIssue ( id: string, issues: IssuesModel): Observable<IssuesModel> {
    const url = `${this.API_URL}/updateIssue/${id}`;
    return this.httpClient.put<IssuesModel>( url, issues );
  }
  deleteIssue(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteIssue/${id}`);
  }
}
