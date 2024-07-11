import { Component, Input } from '@angular/core';
import { NewModel } from '../../models/New.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { PokerService } from '../../services/poker.service';

@Component({
  selector: 'ngx-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss'],
})
export class NewsUpdateComponent {
  @Input() title: string;
  @Input() news: NewModel;

  constructor(
    protected ref: NbDialogRef<NewsUpdateComponent>,
    private apiService: PokerService,
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
