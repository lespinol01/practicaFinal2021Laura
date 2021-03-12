import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionadaPageRoutingModule } from './seleccionada-routing.module';

import { SeleccionadaPage } from './seleccionada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionadaPageRoutingModule
  ],
  declarations: [SeleccionadaPage]
})
export class SeleccionadaPageModule {}
