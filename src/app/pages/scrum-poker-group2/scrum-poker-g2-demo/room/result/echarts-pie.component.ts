import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div></div>
  `,
})
export class EchartsPieComponent  {
  // options: any = {};
  // themeSubscription: any;
  // playerPerformance: { [key: string]: number };
  //
  //
  // constructor(private theme: NbThemeService) {
  // }
  //
  // ngAfterViewInit() {
  //   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  //     const colors = config.variables;
  //     const echarts: any = config.variables.echarts;
  //
  //     this.options = {
  //       backgroundColor: echarts.bg,
  //       color: [config.variables.warningLight, config.variables.infoLight, config.variables.dangerLight],
  //       tooltip: {
  //         trigger: 'item',
  //         formatter: '{a} <br/>{b} : {c} ({d}%)',
  //       },
  //       legend: {
  //         orient: 'vertical',
  //         left: 'left',
  //         data: Object.keys(this.playerPerformance),
  //         textStyle: { color: echarts.textColor },
  //       },
  //       series: [
  //         {
  //           name: 'Participation Rate',
  //           type: 'pie',
  //           radius: '55%',
  //           center: ['50%', '50%'],
  //           data: Object.entries(this.playerPerformance).map(([key, value]) => ({ name: key, value })),
  //           label: {
  //             normal: { textStyle: { color: echarts.textColor } },
  //           },
  //           labelLine: {
  //             normal: { lineStyle: { color: echarts.axisLineColor } },
  //           },
  //         },
  //       ],
  //     };
  //   });
  // }
  //
  // ngOnDestroy(): void {
  //   this.themeSubscription.unsubscribe();
  // }
}
