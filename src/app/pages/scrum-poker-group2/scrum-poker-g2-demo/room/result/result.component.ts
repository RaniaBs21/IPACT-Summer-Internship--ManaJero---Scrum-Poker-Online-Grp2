import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../../../@core/data/smart-table';
import html2canvas from 'html2canvas';
// @ts-ignore
import * as jspdf from 'jspdf';
import {ApiService} from '../../../services/api-service.service';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../../../Models/UserModel';
import {IssuesModel} from '../../../Models/IssuesModel';
import {VoteModel} from '../../../Models/VoteModel';
@Component({
  selector: 'ngx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']})
export class ResultComponent implements OnInit {
  sessionId: string ; // Remplacez par le sessionId réel ou récupérez-le dynamiquement
  userCount: number;
  issueCount: number;
  users: UserModel[] = [];
  issues: IssuesModel[] = [];
  votes: VoteModel[] = [];
  issueId: string;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de la session depuis l'URL
    this.getUserCount();
    this.getIssuesCount();

    this.apiService.getUsersBySession(this.sessionId).subscribe(
      (data: UserModel[]) => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      },
    );
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe(
      (data: IssuesModel[]) => {
        this.issues = data;
      },
      error => {
        console.error('Error fetching users', error);
      },
    );
    this.apiService.getVotes(this.sessionId, this.issueId).subscribe(
      (data: VoteModel[]) => {
        this.votes = data;
      },
      error => {
        console.error('Error fetching users', error);
      },
    );

  }

  getUserCount(): void {
    this.apiService.countUsersInSession(this.sessionId).subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre des utilisateurs:', error);
      },
    );
  }
  getIssuesCount(): void {
    this.apiService.countIssuesInSession(this.sessionId).subscribe(
      (count: number) => {
        this.issueCount = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre des issues:', error);
      },
    );
  }
  /*constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);

  }*/

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  downloadAsPDF(): void {
    const element = document.getElementById('pdfContent');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'px', [canvas.width, canvas.height]);

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('download.pdf');
    });
  }
}
