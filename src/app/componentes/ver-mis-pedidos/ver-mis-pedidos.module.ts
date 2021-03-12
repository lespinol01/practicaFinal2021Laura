import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMisPedidosPageRoutingModule } from './ver-mis-pedidos-routing.module';

import { VerMisPedidosPage } from './ver-mis-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMisPedidosPageRoutingModule
  ],
  declarations: [VerMisPedidosPage]
})
export class VerMisPedidosPageModule {}
