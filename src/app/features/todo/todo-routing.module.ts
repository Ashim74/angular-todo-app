import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
