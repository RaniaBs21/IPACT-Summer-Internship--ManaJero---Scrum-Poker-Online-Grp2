import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div></div>
  `,
})
export class EchartsBarComponent  {
//   options: any = {};
//   themeSubscription: any;
//   issueCount: any ;
//   constructor(private theme: NbThemeService) {
//   }
//
//   ngAfterViewInit() {
//     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
//       const colors = config.variables;
//       const echarts: any = config.variables.echarts;
//
//       this.options = {
//         backgroundColor: echarts.bg,
//         color: [config.variables.primaryLight],
//         tooltip: {
//           trigger: 'axis',
//           axisPointer: { type: 'shadow' },
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Issues'],
//           axisLine: { lineStyle: { color: echarts.axisLineColor } },
//           axisLabel: { textStyle: { color: echarts.textColor } },
//         },
//         yAxis: {
//           type: 'value',
//           axisLine: { lineStyle: { color: echarts.axisLineColor } },
//           splitLine: { lineStyle: { color: echarts.splitLineColor } },
//           axisLabel: { textStyle: { color: echarts.textColor } },
//         },
//         series: [
//           {
//             name: 'Number of Issues',
//             type: 'bar',
//             data: [this.issueCount],
//             barWidth: '60%',
//           },
//         ],
//       };
//     });
//   }
//
//   ngOnDestroy(): void {
//     this.themeSubscription.unsubscribe();
//   }
}
