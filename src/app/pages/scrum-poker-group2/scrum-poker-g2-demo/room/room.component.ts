import {Component, OnInit} from '@angular/core';
import {SessionModel} from '../../Models/SessionModel';
import {ApiService} from '../../services/api-service.service';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {InvitePlayersComponent} from './invite-players/invite-players.component';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']})
export class RoomComponent implements OnInit {
  sessionId: string;
  session: SessionModel;
  cards: string[] = [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  selectedCard: string | null = null;
  isSidebarOpen = false;

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

  getSessionDetails(sessionId: string) {
    this.apiService.getSession(sessionId).subscribe(
      (session: SessionModel) => {
        this.session = session;
      },
      (error) => {
        console.error('Error fetching session details:', error);
      },
    );
  }

  selectCard(card: string) {
    this.selectedCard = card;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
