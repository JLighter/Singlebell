import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EloPage } from './elo';

@NgModule({
  declarations: [
    EloPage,
  ],
  imports: [
    IonicPageModule.forChild(EloPage),
  ],
})
export class EloPageModule {}
