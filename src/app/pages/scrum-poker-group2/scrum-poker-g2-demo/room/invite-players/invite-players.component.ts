import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef } from '@nebular/theme';
import {ApiService} from '../../../services/api-service.service';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../Models/UserModel';

@Component({
  selector: 'ngx-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrls: ['./invite-players.component.scss']})
export class InvitePlayersComponent  implements OnInit  {
 /* @Input() title: string;
  @Input() url: string;
  selectedUser: string | null = null;
  // Déclarez les propriétés pour les utilisateurs, le sujet, et l'utilisateur sélectionné
  users = [
    { name: 'Rania Ben Salem', email: 'rania.skander.0203@gmail.com' },
    { name: 'Chifa Ben Salem', email: 'chifabensalem02@gmail.com' },
    // Ajoutez d'autres utilisateurs ici
  ];
  subject: string;
  private baseUrl = 'http://localhost:4200'; // Définir la base de l'URL
  sessionId: string;
  constructor(
    protected ref: NbDialogRef<InvitePlayersComponent>,
    private apiService: ApiService, // Injectez le service d'email
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }

 sendInvitation() {
    if (this.selectedUser && this.subject) {
      const fullUrl = `${this.baseUrl}${this.url}`; // Concaténer la base de l'URL avec l'URL active
      const body = `Please visit the following URL to join: ${fullUrl}`;
      this.apiService.sendEmail(this.selectedUser, this.subject, body).subscribe(
        response => {
          console.error('Email sent successfully');
          this.ref.close(); // Ferme le popup après l'envoi
        },
        error => {
          console.error('Error sending email', error);
        },
      );
    } else {
      console.error('Please fill in all fields');
    }
  }*/

  @Input() title: string;
  @Input() url: string;
  selectedUser: string | null = null;

  userName: string = '';
  userEmail: string = '';
  subject: string = '';
  sessionId: string;
  private baseUrl = 'http://localhost:4200';
  constructor(
    protected ref: NbDialogRef<InvitePlayersComponent>,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id') || '';
    console.error('Session ID:', this.sessionId); // Vérifiez la valeur récupérée
  }

  cancel() {
    this.ref.close();
  }

  sendInvitation() {
    const fullUrl = `${this.baseUrl}${this.url}`;
    const body = `Please visit the following URL to join: ${fullUrl}`;
    const newUser: UserModel = {
      name: this.userName,
      email: this.userEmail,
      sessionId: this.sessionId,
    };

    console.error('Sending email to:', this.userEmail);  // Vérifiez que l'email est correct
    this.apiService.sendEmail(this.userEmail, this.subject, body).subscribe(
      response => {
        console.error('Email sent successfully:', response);

        console.error('Adding user to the session:', newUser);  // Vérifiez les données de l'utilisateur
        this.apiService.addUser(this.sessionId, newUser).subscribe(
          userResponse => {
            console.error('User added successfully to the session:', userResponse);
            this.ref.close();
          },
          userError => {
            console.error('Error adding user to the session', userError);
          },
        );
      },
      error => {
        console.error('Error sending email', error);
      },
    );
  }


}
