import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneratorPage } from './generator';

@NgModule({
  declarations: [
    GeneratorPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneratorPage),
  ],
})
export class GeneratorPageModule {}
