import { Component } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  cards: string[] = [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
  selectedCard: string | null = null;
  isDropdownOpen = false;
  selectedOption: string;
  showForm = false;
  issueTitle = '';
  revealedCard: number | string | null = null;
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
}
