import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import confetti from 'canvas-confetti';
import {Project, SearchResults} from 'jira.js/out/version3/models';
import {IssuesModel} from '../../Models/IssuesModel';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api-service.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AzureDevOpsProject} from '../../Models/ImportRepresentation/AzureDevOpsProject';
import {IssuesRequest} from '../../Models/ImportRepresentation/IssuesRequest';
import {JiraAuthService} from '../../services/jira-auth.service';
import {AuthAzureServiceService} from '../../../../auth-azure-service.service';
import {MsalService} from '@azure/msal-angular';
import {SessionModel} from '../../Models/SessionModel';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  cards: string[] = [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  selectedCard: string | null = null;
  isDropdownOpen = false;
  selectedOption: string;
  showForm = false;
  issueTitle = '';
  revealedCard: number | string | null = null;
  // issues in session
  selectedAzureProjectName: string;
  jiraIssues: SearchResults;
   azure: AzureDevOpsProject [] = [];
   jiraLoginSuccessful: boolean = false;
   azureLoginSuccessful: boolean = false;
   jiraProjects: Project[] = [];
   issuesRequests: IssuesRequest[] = [];
   issues: IssuesModel = new IssuesModel();
   issue: IssuesModel[] = [];
   lastAddedIssues: any;
  selectedJiraProjectName: string;
  // bread crumb items
  session: SessionModel;
   hidden: boolean;
    submittedDescription: string = '';
   id: '1';
  modalRef?: BsModalRef;
   sessionId: '1';
  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private routes: ActivatedRoute,
      private service: ApiService,
      private modalService: BsModalService,
      private jiraAuthService: JiraAuthService,
      private azureAuthService: AuthAzureServiceService,
      private azureLogin: MsalService,
     ) { }

  ngOnInit() {
    this.azureLogin.initialize();
    this.hidden = true;
  }
  triggerConfetti(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  selectCard(card: string) {
    this.selectedCard = card;
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  saveIssue() {
    if (this.issueTitle) {
      this.showForm = false;
      this.issueTitle = '';
    }
  }

  cancel() {
    this.showForm = false;
    this.issueTitle = '';
  }
  revealCard(): void {
    if (this.selectedCard !== null) {
      this.revealedCard = this.selectedCard;
    }
    this.triggerConfetti();
  }
  // **************Issues Process ****************++
  openBootstrapModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModal() {
    this.modalRef?.hide();
  }

  jiraButtonClick(template: TemplateRef<void>) {
    if (!this.jiraLoginSuccessful) {
      this.loginToJira();
    } else {
      this.getJiraProjects(template);
    }
  }
  azureButtonClick(template: TemplateRef<void>) {
    if (!this.azureLoginSuccessful) {
      this.loginToAzure();
    } else {
      this.getAzureProjects(template);
    }
  }

  getAzureProjects(template: TemplateRef<void>) {
    if (this.azureLoginSuccessful) {
      this.service.getProjectsAzure().subscribe((response: any) => {
        const responses: AzureDevOpsProject[] = [];
        if (response && response.value && response.value.length > 0) {
          response.value.forEach((projects: any) => {
            const id = projects.id;
            const name = projects.name;
            const newProject = new AzureDevOpsProject(id, name);
            responses.push(newProject);
          });

        }
        this.azure = responses;
        this.openBootstrapModal(template);
      });

    }

  }

  loginToAzure() {
    this.azureAuthService.login();
    this.azureLoginSuccessful = true;
  }

  loginToJira() {
    this.jiraAuthService.login();
    this.jiraLoginSuccessful = true;
  }
  getJiraProjects(template: TemplateRef<void>) {
    if (this.jiraLoginSuccessful) {
      this.service.getProjects().subscribe(value => {
        this.jiraProjects = value;
        this.openBootstrapModal(template);
      });
    }
  }
    selectJiraProject(jiraProjectName: any, template: TemplateRef<void>) {

    this.selectedJiraProjectName = jiraProjectName;
    this.modalRef.hide();
    this.getIssues(this.selectedJiraProjectName, template);
  }
  selectAzureProject(azureProjectName: any, template: TemplateRef<void>) {

    this.selectedAzureProjectName = azureProjectName;
    this.modalRef.hide();
    this.getIssuesAzure(this.selectedAzureProjectName, template);

  }

  getIssues(projectName: string, template: TemplateRef<void>) {
    this.service.getProjectIssues(projectName).subscribe(value => {
      this.jiraIssues = value;
      this.openBootstrapModal(template);
    });
  }
  getIssuesAzure(projectName: string, template: TemplateRef<void>) {
    this.service.getWorkItems(projectName).subscribe((response: any) => {
      const responses: AzureDevOpsProject[] = [];
      if (response && response.value && response.value.length > 0) {
        response.value.forEach((issue: any) => {
          const fields = issue.fields;
          const key: string = fields['System.Id'];
          const summary: string = fields['System.Title'];
          const status: string = fields['System.State'];
          responses.push(new AzureDevOpsProject(key, summary));
        });
      }
      this.azure = responses;

      this.openBootstrapModal(template);
    });
  }

  addIssueToLocalList(issuesKey: string, issueDescription: string) {
    this.issuesRequests.push({
      description: issueDescription,
      issueKey: issuesKey,
      platformId: 'JIRA',
    } as IssuesRequest);
    this.service.insertUserStory(this.issuesRequests, this.id).subscribe(rep => null);
    console.error(this.issuesRequests);
  }
  addIssueToLocalListAzure(issueDescription: string) {
    this.issuesRequests.push({
      description: issueDescription,
      platformId: 'AZURE',
    } as IssuesRequest);
  }

////////////////////////////////
  // Add issues To Session

  addIssues(issueDescription: string): void {
    this.service.addIssuesBySessionId(this.issues, this.sessionId).subscribe();
    this.submittedDescription = this.issues.description;
    this.lastAddedIssues = this.issues;
    this.issuesRequests.push({
      description: issueDescription,
    } as IssuesModel);
    this.service.insertUserStory(this.issuesRequests, this.id).subscribe(v => null);
  }

  toggleVote(issue) {
    issue.isVoting = !issue.isVoting;
  }
  toggleDropdownSession() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
