import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';
import {InfoModel} from '../../Models/InfoModel';

@Component({
  selector: 'ngx-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']})
export class NewsUpdateComponent {
  @Input() title: string;
  @Input() info: InfoModel;

  constructor(
    protected ref: NbDialogRef<NewsUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce bénéfice ?')) {
      this.updateInfo();
    }
  }

  updateInfo() {
    this.apiService.updateNews(this.info.id, this.info).subscribe(
      () => {
        this.toastrService.success('Bénéfice mis à jour avec succès', 'Succès');
        this.ref.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du bénéfice :', error);
        this.toastrService.danger('Échec de la mise à jour du bénéfice', 'Erreur');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
