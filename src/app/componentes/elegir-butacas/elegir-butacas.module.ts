import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElegirButacasPageRoutingModule } from './elegir-butacas-routing.module';

import { ElegirButacasPage } from './elegir-butacas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElegirButacasPageRoutingModule
  ],
  declarations: [ElegirButacasPage]
})
export class ElegirButacasPageModule {}
