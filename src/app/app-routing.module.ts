import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'quiz' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  {
    path: 'dictionary',
    children: [
      {
        path: '',
        loadChildren: './dictionary/dictionary.module#DictionaryPageModule'
      },
      {
        path: 'easy',
        loadChildren: './dictionary/dictionary.module#DictionaryPageModule'
      },
      {
        path: 'medium',
        loadChildren: './dictionary/dictionary.module#DictionaryPageModule'
      },
      {
        path: 'hard',
        loadChildren: './dictionary/dictionary.module#DictionaryPageModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
