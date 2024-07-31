import {Component, HostListener, Input, OnInit, TemplateRef} from '@angular/core';
import {SessionModel} from '../../Models/SessionModel';
import {ApiService} from '../../services/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {InvitePlayersComponent} from './invite-players/invite-players.component';
import { Location } from '@angular/common';
// @ts-ignore
import confetti from 'canvas-confetti';
import {LimitsModel} from '../../Models/LimitsModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IssuesModel} from '../../Models/IssuesModel';
import {DemoModel} from '../../Models/DemoModel';
import {LimitsUpdateComponent} from '../limits-update/limits-update.component';
import {IssuesUpdateComponent} from './issues-update/issues-update.component';
import {SessionUpdateComponent} from './session-update/session-update.component';
import {VotingHistoryComponent} from './voting-history/voting-history.component';
import {SearchResults, Project} from 'jira.js/out/version3/models';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {IssuesRequest} from '../../Models/ImportRepresentation/IssuesRequest';
import {JiraAuthService} from '../../services/jira-auth.service';
import * as XLSX from 'xlsx';
import {AuthAzureServiceService} from '../../../../auth-azure-service.service';
import {MsalService} from '@azure/msal-angular';
import {AzureDevOpsProject} from '../../Models/ImportRepresentation/AzureDevOpsProject';
import {AuthServiceService} from '../../../../auth-service.service';
@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']})
export class RoomComponent implements OnInit {
  sessionId: string;
  session: SessionModel;
  cards: string[] = [];
  selectedCard: string | null = null;
  isSidebarOpen = false;
  isDropdownOpen = false;
  selectedOption: string;
  showForm = false;
  issueTitle = '';
  revealedCard: number | string | null = null;
  addIssuesForm: FormGroup;
  issues: IssuesModel[] = [];
  sessions: SessionModel[] = [];
  loading: boolean = false;
  page: number = 1; // Page de départ
  pageSize: number = 20; // Nombre d'éléments par page
  private isLoading: boolean = false;
  dropdownVisible = false;
  selectedIssue: IssuesModel | null = null;
  isDropdownSessionOpen = false;
  dropdownOpen: { [key: number]: boolean } = {}; ////// dropdown ///////////
  // issues in session
  selectedAzureProjectName: string;
  jiraIssues: SearchResults;
  azure: AzureDevOpsProject [] = [];
  jiraLoginSuccessful: boolean = false;
  azureLoginSuccessful: boolean = false;
  jiraProjects: Project[] = [];
  issuesRequests: IssuesRequest[] = [];
  iss: IssuesModel = new IssuesModel();
  issue: IssuesModel[] = [];
  lastAddedIssues: any;
  selectedJiraProjectName: string;
  modalRef?: BsModalRef;
  submittedDescription: string = '';
  hidden: boolean;
  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dialogService: NbDialogService,
              private location: Location,
              private toastrService: NbToastrService,
              private fb: FormBuilder,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private jiraAuthService: JiraAuthService,
              private azureAuthService: AuthAzureServiceService,
              private azureLogin: MsalService,
              private authService: AuthServiceService,
              ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.getSessionDetails(this.sessionId);
    });
    if (!this.sessionId) {
      this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    }
    this.loadIssues();
    this.addIssuesForm = this.fb.group({
      issueDescription: ['', Validators.required],
    });
    this.azureLogin.initialize();
    this.hidden = true;
  }
  loadIssues() {
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe((issues: IssuesModel[]) => {
      this.issues = issues;
    });
  }
  loadSessions() {
    this.apiService.getSessionById(this.sessionId).subscribe((session: SessionModel) => {
      this.session = session;
    });
  }

  triggerConfetti(): void {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  getSessionDetails(sessionId: string) {
    this.apiService.getSession(sessionId).subscribe(
      (session: SessionModel) => {
        this.session = session;
        this.cards = this.getCardsForSystem(session.votingSystem);
      },
      (error) => {
        console.error('Error fetching session details:', error);
      },
    );
  }
  getCardsForSystem(system: string): string[] {
    switch (system) {
      case 'FIBONACCI':
        return [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
      case 'MODIFIED_FIBONACCI':
        return [' ☕', '0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
      case 'TSHIRTS':
        return [' ☕', 'XS', 'S', 'M', 'L', 'XL'];
      case 'POWERS_OF_2':
        return [' ☕', '0', '1', '2', '4', '8', '16', '32', '64'];
      default:
        return [];
    }
  }
  selectCard(card: string) {
    this.selectedCard = card;
  }
  toggleVote(issue: IssuesModel) {
    issue.isVoting = !issue.isVoting;
    this.selectedIssue = issue.isVoting ? issue : null;
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
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
  openInvitePlayers() {
    const currentUrl = this.location.path();
    this.dialogService.open(InvitePlayersComponent, {
      context: {
        title: 'Invite players',
        url: currentUrl,
      },
    });
  }
  confirmIssueAdd() {
    if (this.addIssuesForm.valid) {
      if (confirm('Are you sure you want to add this issue?')) {
        this.addIssue();
        this.loadIssues();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }
  addIssue() {
    const newIssue: IssuesModel = this.addIssuesForm.value;
    this.apiService.addIssue(this.sessionId, newIssue).subscribe(
      (issue) => {
        this.issues.push(issue);
        this.addIssuesForm.reset();
        this.toastrService.success('issue added successfully', 'Success');
        this.loadIssues();
      },
      (error) => {
        console.error('Error adding the issue:', error);
        this.toastrService.danger('Failed to add the issue', 'Error');
      },
    );
  }
  toggleDropdownSession() {
    this.isDropdownSessionOpen = !this.isDropdownSessionOpen;
  }
  openSessionUpdate(session: SessionModel) {
    this.dialogService.open(SessionUpdateComponent, {
      context: {
        title: 'Update issue',
        session: {...session},
      },
    }).onClose.subscribe(() => this.loadSessions());
  }
  openVotingHistory() {
    this.dialogService.open(VotingHistoryComponent, {
      context: {
      },
    }).onClose.subscribe(() => this.loadIssues());
  }
  ///////////////////////////// dropdown ///////////////////////

  toggleDropdownIssue(issueId: number) {
    this.dropdownOpen[issueId] = !this.dropdownOpen[issueId];
  }

  openIssueUpdate(issue: IssuesModel) {
    this.dialogService.open(IssuesUpdateComponent, {
      context: {
        title: 'Update issue',
        issue: { ...issue },
      },
    }).onClose.subscribe(() => this.loadIssues());
  }

  deleteIssue(id: string) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.apiService.deleteIssue(id).subscribe(
        () => {
          this.issues = this.issues.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the issue:', error);
        },
      );
    }
  }

  moveIssueToTop(issueId: number) {
    const index = this.issues.findIndex(issue => issue.id === issueId.toString());
    if (index > 0) {
      const [issue] = this.issues.splice(index, 1);
      this.issues.unshift(issue);
    }
  }

  moveIssueToBottom(issueId: number) {
    const index = this.issues.findIndex(issue => issue.id === issueId.toString());
    if (index !== -1 && index < this.issues.length - 1) {
      const [issue] = this.issues.splice(index, 1);
      this.issues.push(issue);
    }
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
      this.apiService.getProjectsAzure().subscribe((response: any) => {
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
      this.apiService.getProjects().subscribe(value => {
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
    this.apiService.getProjectIssues(projectName).subscribe(value => {
      this.jiraIssues = value;
      this.openBootstrapModal(template);
    });
  }
  getIssuesAzure(projectName: string, template: TemplateRef<void>) {
    this.apiService.getWorkItems(projectName).subscribe((response: any) => {
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
    this.apiService.insertUserStory(this.issuesRequests, this.sessionId).subscribe(rep => null);
    console.error(this.issuesRequests);
  }
  addIssueToLocalListAzure(issueDescription: string) {
    this.issuesRequests.push({
      description: issueDescription,
      platformId: 'AZURE',
    } as IssuesRequest);
  }
  // ************** Uplaod CSV *********************

  saveToLocalStorage(): void {
    localStorage.setItem('userStories', JSON.stringify(this.issue));
    this.apiService.save(this.iss);
  }

  fetchUserStory() {
    this.apiService.getIssues()
      .subscribe((issue) => {
        this.issue = issue;
      });
  }

  ReadExcel(event: any, sessionId: string): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workBook = XLSX.read(data, { type: 'array' });

      const sheet = workBook.Sheets[workBook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(sheet) as IssuesModel[];
      excelData.forEach((row) => {
        const description = row['description'];

        this.apiService.uploadFile(file, sessionId).subscribe(
          (response) => {
            const newUserStory = new IssuesModel();
            newUserStory.description = description;
            this.apiService.save(newUserStory);
            this.saveToLocalStorage();
            this.fetchUserStory();
          },
          (error) => {
            console.error('Upload error:', error);
          },
        );
        this.issuesRequests.push({
          description: description,
        } as IssuesModel);
      });

    };

    fileReader.readAsArrayBuffer(file);
  }
  downloadExcel() {
    // Préparer les données à exporter
    const worksheet = XLSX.utils.json_to_sheet(this.issuesRequests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Issues');

    // Générer et télécharger le fichier Excel
    XLSX.writeFile(workbook, 'issues.xlsx');
  }

}
