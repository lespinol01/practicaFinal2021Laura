import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCinePageRoutingModule } from './home-cine-routing.module';

import { HomeCinePage } from './home-cine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCinePageRoutingModule
  ],
  declarations: [HomeCinePage]
})
export class HomeCinePageModule {}
