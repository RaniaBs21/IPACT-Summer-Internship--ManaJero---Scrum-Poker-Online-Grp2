import {Injectable} from '@angular/core';
import {AzureDevOpsProject} from './pages/scrum-poker-group2/Models/ImportRepresentation/AzureDevOpsProject';
import {Issue} from 'jira.js/out/agile';
import {ApiService} from './pages/scrum-poker-group2/services/api-service.service';
import {MsalService} from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthAzureServiceService {

  projects: AzureDevOpsProject [] = [];
  isLoggedIn = false ;
  data: Issue;
  us: any;


  constructor(private azureAuthService: MsalService, private Service: ApiService) {
  }

  login() {
    this.azureAuthService.loginPopup()
      .subscribe({
        next: (result) => {
        },
      });
    this.isLoggedIn = true;
  }
}
