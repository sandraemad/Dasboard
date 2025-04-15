import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { log } from 'console';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { TestsComponent } from './pages/tests/tests.component';
import { UpdateQuestionComponent } from './pages/update-question/update-question.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { QuestionComponent } from './pages/question/question.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { AnalysisComponent } from './pages/analysis/analysis.component';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent,title:'Login'},
  ]},

  {path:'',component:MainLayoutComponent,children:[
    {path:'users',loadComponent:()=>import('./pages/users/users.component').then((c)=>c.UsersComponent),title:'Users'},
    {path:'test',loadComponent:()=>import('./pages/tests/tests.component').then((c)=>c.TestsComponent),title:'Test'},
    {path:'updateQuestion/:id',loadComponent:()=>import('./pages/update-question/update-question.component').then((c)=>c.UpdateQuestionComponent),title:'Update Question'},
    {path:'question/:id', loadComponent:()=>import('./pages/question/question.component').then((c)=>c.QuestionComponent),title:'Question'},
    {path:'addQuestion/:id',loadComponent:()=>import('./pages/add-question/add-question.component').then((c)=>c.AddQuestionComponent),title:'Add Question'},
    {path:'userDetail/:id',loadComponent:()=>import('./pages/user-detail/user-detail.component').then((c)=>c.UserDetailComponent),title:'User Details'},
    {path:'profile',component:ProfileComponent,title:'Profile'},
    {path:'setting',loadComponent:()=>import('./pages/setting/setting.component').then((c)=>c.SettingComponent),title:'Setting'} ,
    {path:'analysis',component:AnalysisComponent}
  ]},
];
