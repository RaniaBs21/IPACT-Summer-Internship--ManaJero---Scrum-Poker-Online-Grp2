import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScrumPokerGroup2DemoComponent} from './scrum-poker-group2-demo/scrum-poker-group2-demo.component';
import {ScrumPokerG2DemoComponent} from './scrum-poker-g2-demo/scrum-poker-g2-demo.component';


const routes: Routes = [{
  path: '',
  component: ScrumPokerG2DemoComponent,
  children: [
    {
      path: 'dialog',
     // component: DialogComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrumPokerGroup2RoutingModule {
}


