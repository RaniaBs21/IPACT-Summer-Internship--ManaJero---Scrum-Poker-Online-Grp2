import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from '../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  settings = {
    add: { addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>' },
    edit: { editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>', cancelButtonContent: '<i class="nb-close"></i>' },
    delete: { deleteButtonContent: '<i class="nb-trash"></i>', confirmDelete: true },
    columns: {
      id: { title: 'ID', type: 'number' },
      username: { title: 'Username', type: 'string' },
      email: { title: 'E-mail', type: 'string' },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  userCount: number;
  issueCount: number;
  option: any;
  playerPerformance: { [key: string]: number };
  sessionId: string;
  barChartOptions: any = {};
  pieChartOptions: any = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sessionId = params.get('sessionId');
      if (this.sessionId) {
        this.loadStatistics(this.sessionId);
      }
    });
  }
  loadStatistics(sessionId: string): void {
    this.apiService.getUserCount(sessionId).subscribe(count => {
      this.userCount = count;
      console.error('User Count:', this.userCount); // Vérification
      this.initUserCountChart(this.userCount);
      this.pieChartOptions();
      this.barChartOptions();
      this.initIssueCountChart(this.issueCount);
    });
    this.apiService.getStatistics(sessionId).subscribe(data => {
      this.issueCount = data.issueCount;
      console.error('Issue Count:', this.issueCount); // Vérification
      this.playerPerformance = data.playerPerformance;
      console.error('Player Performance:', this.playerPerformance); // Vérification
      this.source.load(data.estimations);

      // Vérification des données des graphiques
      console.error('Data for Bar Chart:', this.barChartOptions);
      console.error('Data for Pie Chart:', this.pieChartOptions);
    });
  }
  initIssueCountChart(issueCount: number): void {
    this.barChartOptions = {
      backgroundColor: '#f5f5f5',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: ['Issues'], axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: '#ccc' }}, axisLabel: { textStyle: { color: '#333' }}},
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#ccc' }},
        splitLine: { lineStyle: { color: '#e0e0e0' }}, axisLabel: { textStyle: { color: '#333' }}},
      series: [{ name: 'Issues', type: 'bar', barWidth: '60%', data: [issueCount] }],
    };
  }

  initUserCountChart(userCount: number): void {
    this.pieChartOptions = {
      // Vérification des options
      backgroundColor: '#f5f5f5',
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left', data: ['Users'] },
      series: [{ name: 'Users', type: 'pie', radius: '55%', center: ['50%', '50%'],
        data: [{ name: 'Users', value: userCount }],
        itemStyle: { emphasis: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }},
        label: { normal: { textStyle: { color: '#333' }}},
        labelLine: { normal: { lineStyle: { color: '#ccc' }}}}],
    };
    console.error('Pie Chart Options:', this.pieChartOptions); // Vérification
  }
  initParticipationRateChart(playerPerformance: { [key: string]: number }): void {
    this.barChartOptions = {
      backgroundColor: '#f5f5f5',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: Object.keys(playerPerformance), axisTick: { alignWithLabel: true },
        axisLine: { lineStyle: { color: '#ccc' }}, axisLabel: { textStyle: { color: '#333' }}},
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#ccc' }},
        splitLine: { lineStyle: { color: '#e0e0e0' }}, axisLabel: { textStyle: { color: '#333' }}},
      series: [{ name: 'Participation', type: 'bar', barWidth: '60%', data: Object.values(playerPerformance) }],
    };
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
