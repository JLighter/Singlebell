import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercicesPage } from './exercices';

@NgModule({
  declarations: [
    ExercicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExercicesPage),
  ],
})
export class ExercicesPageModule {}
