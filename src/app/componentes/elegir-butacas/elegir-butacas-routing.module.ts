import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElegirButacasPage } from './elegir-butacas.page';

const routes: Routes = [
  {
    path: '',
    component: ElegirButacasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElegirButacasPageRoutingModule {}
