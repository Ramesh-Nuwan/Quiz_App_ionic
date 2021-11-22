import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { StartComponent } from './components/start/start.component';
import { ViewQuizComponent } from './pages/view-quiz/view-quiz.component';
import { UserLevelComponent } from './pages/user-level/user-level.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    CountdownModule
  ],
  declarations: [
    Tab1Page,
    ViewQuestionComponent,
    ViewQuizComponent,
    UserLevelComponent,
    StartComponent,
  ]
})
export class Tab1PageModule {}
