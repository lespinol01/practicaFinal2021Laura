import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCinePage } from './home-cine.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCinePageRoutingModule {}
