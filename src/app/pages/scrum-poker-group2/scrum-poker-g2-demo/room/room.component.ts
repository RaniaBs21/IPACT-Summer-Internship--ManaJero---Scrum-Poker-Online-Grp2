import { Component } from '@angular/core';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']})
export class RoomComponent {
  cards: string[] = [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  selectedCard: string | null = null;

  selectCard(card: string) {
    this.selectedCard = card;
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
