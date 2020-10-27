import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent},
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'lists', component: TaskViewComponent},
  { path: 'lists/:listId', component: TaskViewComponent},
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'edit-task/:listId/task/:taskId', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
