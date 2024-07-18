import {Component, OnInit} from '@angular/core';
import {SessionModel} from '../../Models/SessionModel';
import {ApiService} from '../../services/api-service.service';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {InvitePlayersComponent} from './invite-players/invite-players.component';
import { Location } from '@angular/common';
// @ts-ignore
import confetti from 'canvas-confetti';

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

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dialogService: NbDialogService,
              private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.getSessionDetails(this.sessionId);
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
}
