import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { SessionModel } from '../../models/SessionModel';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

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
}
