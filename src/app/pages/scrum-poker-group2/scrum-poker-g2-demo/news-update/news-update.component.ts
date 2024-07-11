import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../services/api-service.service';
import {NewsModel} from '../../Models/NewsModel';

@Component({
  selector: 'ngx-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']})
export class NewsUpdateComponent {
  @Input() title: string;
  @Input() news: NewsModel;

  constructor(
    protected ref: NbDialogRef<NewsUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}

  confirmUpdate() {
    if (confirm('Are you sure you want to update this information?')) {
      this.updateNews();
    }
  }

  updateNews() {
    this.apiService.updateNews(this.news.id, this.news).subscribe(
      () => {
        this.toastrService.success('Information updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the information:', error);
        this.toastrService.danger('Failed to update the information', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
