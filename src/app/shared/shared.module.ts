import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WordOptionsComponent } from './word-options/word-options.component';
import { WordComponent } from './word/word.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    WordComponent,
    WordOptionsComponent,
  ],
  exports: [
    WordComponent,
    WordOptionsComponent
  ]
})
export class SharedModule { }
