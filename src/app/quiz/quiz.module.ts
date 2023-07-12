import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuizPage} from './quiz.page';
import {AllMaterialModule} from '../all-material.module';
import {QuizInterfaceComponent} from '../quiz-interface/quiz-interface.component';
import {QuizSingleWordComponent} from './quiz-single-word/quiz-single-word.component';

const routes: Routes = [
  {
    path: '',
    component: QuizPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    AllMaterialModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    QuizPage,
    QuizInterfaceComponent,
    QuizSingleWordComponent
  ]
})
export class QuizPageModule { }
