import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerMisPedidosPage } from './ver-mis-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: VerMisPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerMisPedidosPageRoutingModule {}
