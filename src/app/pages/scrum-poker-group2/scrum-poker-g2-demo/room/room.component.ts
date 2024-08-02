import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SessionModel } from '../../Models/SessionModel';
import { ApiService } from '../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { InvitePlayersComponent } from './invite-players/invite-players.component';
import { Location } from '@angular/common';
// @ts-ignore
import confetti from 'canvas-confetti';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesModel } from '../../Models/IssuesModel';
import { IssuesUpdateComponent } from './issues-update/issues-update.component';
import { SessionUpdateComponent } from './session-update/session-update.component';
import { VoteModel } from '../../models/VoteModel';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
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
  selectedIssue: IssuesModel | null = null;
  addIssuesForm: FormGroup;
  issues: IssuesModel[] = [];
  sessions: SessionModel[] = [];
  loading: boolean = false;
  page: number = 1; // Page de départ
  pageSize: number = 20; // Nombre d'éléments par page
  private isLoading: boolean = false;
  dropdownVisible = false;
  dropdownOpen: { [key: number]: boolean } = {}; ////// dropdown ///////////

  selectedIssueId: string | null = null;
  votes: VoteModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private location: Location,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.getSessionDetails(this.sessionId);
    });
    this.loadIssues();
    this.addIssuesForm = this.fb.group({
      issueDescription: ['', Validators.required],
    });
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
        this.toastrService.success('Issue added successfully', 'Success');
        this.loadIssues();
      },
      (error) => {
        console.error('Error adding the issue:', error);
        this.toastrService.danger('Failed to add the issue', 'Error');
      },
    );
  }

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

  toggleDropdownSession() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openSessionUpdate(session: SessionModel) {
    this.dialogService.open(SessionUpdateComponent, {
      context: {
        title: 'Update session',
        session: { ...session },
      },
    }).onClose.subscribe(() => this.loadSessions());
  }
  ///////////// vote/////////////
  selectCard(card: string) {
    this.selectedCard = card;
  }
  revealCard(): void {
    if (this.selectedCard !== null) {
      this.revealedCard = this.selectedCard;
      this.submitVote();
    }
    this.triggerConfetti();
  }
  toggleVote(issue: IssuesModel) {
    if (this.selectedIssue && this.selectedIssue.id === issue.id) {
      this.selectedCard = null;
      this.revealedCard = null;
      this.selectedIssue.isVoting = !this.selectedIssue.isVoting;
    } else {
      this.issues.forEach(i => i.isVoting = false);
      this.selectedCard = null;
      this.revealedCard = null;

      // Set the new issue for voting
      this.selectedIssue = issue;
      this.selectedIssueId = issue.id.toString();
      issue.isVoting = true;
    }
  }
  // submitVote() {
  //   if (this.selectedCard !== null && this.selectedIssueId !== null) {
  //     const vote: VoteModel = {
  //       sessionId: this.session.id,
  //       issueId: this.selectedIssueId,
  //       vote: this.selectedCard,
  //     };
  //
  //     this.apiService.addVote(vote).subscribe((response) => {
  //
  //       const issue = this.issues.find(i => i.id === this.selectedIssueId);
  //       if (issue) {
  //         issue.hasVoted = true; // Mark issue as voted
  //         issue.isVoting = false; // End the voting process for this issue
  //       }
  //
  //       this.revealedCard = this.selectedCard;
  //       this.selectedCard = null;
  //       this.selectedIssue = null;
  //       this.selectedIssueId = null;
  //       this.loadVotes(this.session.id, this.selectedIssueId);
  //
  //       this.triggerConfetti();
  //     });
  //   } else {
  //     console.error('No card selected or no issue selected.');
  //   }
  // }
  submitVote() {
    if (this.selectedCard !== null && this.selectedIssueId !== null) {
      const vote: VoteModel = {
        sessionId: this.session.id,
        issueId: this.selectedIssueId,
        vote: this.selectedCard,
      };

      this.apiService.addVote(vote).subscribe((response) => {
        const issue = this.issues.find(i => i.id === this.selectedIssueId);
        if (issue) {
          issue.hasVoted = true;
          issue.isVoting = false;
          issue.lastVoteValue = this.selectedCard; // Store the last vote value
        }

        this.revealedCard = this.selectedCard;
        this.selectedCard = null;
        this.selectedIssue = null;
        this.selectedIssueId = null;
        this.loadVotes(this.session.id, this.selectedIssueId);

        this.triggerConfetti();
      });
    } else {
      console.error('No card selected or no issue selected.');
    }
  }

  loadVotes(sessionId: string, issueId: string) {
    this.apiService.getVotes(sessionId, issueId).subscribe(
      (votes: VoteModel[]) => {
        this.votes = votes;
      },
      (error) => {
        console.error('Error fetching votes:', error);
      },
    );
  }

  triggerConfetti() {
    confetti();
  }
  calculateAverage(votes: VoteModel[]): string {
    const sum = votes.reduce((acc, vote) => acc + parseFloat(vote.vote), 0);
    return (sum / votes.length).toFixed(2);
  }

}

