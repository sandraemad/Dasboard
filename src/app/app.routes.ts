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
    {path:'login',component:LoginComponent,title:'Login',canActivate:[loggedGuard]},
  ]},

  {path:'',component:MainLayoutComponent,children:[
    {path:'users',loadComponent:()=>import('./pages/users/users.component').then((c)=>c.UsersComponent),title:'Users',canActivate:[authGuard]},
    {path:'test',loadComponent:()=>import('./pages/tests/tests.component').then((c)=>c.TestsComponent),title:'Test',canActivate:[authGuard]},
    {path:'updateQuestion/:id',loadComponent:()=>import('./pages/update-question/update-question.component').then((c)=>c.UpdateQuestionComponent),title:'Update Question',canActivate:[authGuard]},
    {path:'question/:id', loadComponent:()=>import('./pages/question/question.component').then((c)=>c.QuestionComponent),title:'Question',canActivate:[authGuard]},
    {path:'addQuestion/:id',loadComponent:()=>import('./pages/add-question/add-question.component').then((c)=>c.AddQuestionComponent),title:'Add Question',canActivate:[authGuard]},
    {path:'userDetail/:id',loadComponent:()=>import('./pages/user-detail/user-detail.component').then((c)=>c.UserDetailComponent),title:'User Details',canActivate:[authGuard]},
    {path:'profile',component:ProfileComponent,title:'Profile',canActivate:[authGuard]},
    {path:'setting',loadComponent:()=>import('./pages/setting/setting.component').then((c)=>c.SettingComponent),title:'Setting',canActivate:[authGuard]}, 
    {path:'analysis',component:AnalysisComponent,title:'لوحه التحكم',canActivate:[authGuard]}
  ]},
];
