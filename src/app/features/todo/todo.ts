import { Component, effect, signal } from '@angular/core';
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
  private readonly storageKey = 'todos';

  newTask = '';

  todos = signal<TodoItem[]>(this.loadTodos());

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos()));
    });
  }

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

  private loadTodos(): TodoItem[] {
    const savedTodos = localStorage.getItem(this.storageKey);

    if (!savedTodos) {
      return this.defaultTodos();
    }

    try {
      const parsed = JSON.parse(savedTodos);

      if (!Array.isArray(parsed)) {
        return this.defaultTodos();
      }

      return parsed.filter(
        (item): item is TodoItem =>
          typeof item?.id === 'number' &&
          typeof item?.text === 'string' &&
          typeof item?.completed === 'boolean'
      );
    } catch {
      return this.defaultTodos();
    }
  }

  private defaultTodos(): TodoItem[] {
    return [
      { id: 1, text: 'Learn Angular basics', completed: false },
      { id: 2, text: 'Build a Todo app', completed: true }
    ];
  }
}
