import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionadaPage } from './seleccionada.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionadaPageRoutingModule {}
