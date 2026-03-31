import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  newTask = '';

  todos = signal<TodoItem[]>([
    { id: 1, text: 'Learn Angular basics', completed: false },
    { id: 2, text: 'Build a Todo app', completed: true }
  ]);

  addTodo(): void {
    const text = this.newTask.trim();

    if (!text) {
      return;
    }

    this.todos.update((items) => [
      ...items,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ]);

    this.newTask = '';
  }

  toggleTodo(id: number): void {
    this.todos.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  deleteTodo(id: number): void {
    this.todos.update((items) => items.filter((item) => item.id !== id));
  }
}
