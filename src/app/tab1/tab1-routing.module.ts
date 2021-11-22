import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ViewQuizComponent } from './pages/view-quiz/view-quiz.component';
import { UserLevelComponent } from './pages/user-level/user-level.component';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'userlevel',
    component: UserLevelComponent,
  },
  {
    path: 'userlevel/:currentLevel/quiz/:level',
    component: ViewQuizComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
