import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[TodoListComponent]
})
export class TodoListModule {}
