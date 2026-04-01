import { Injectable, signal } from '@angular/core';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoStoreService {
  readonly todos = signal<TodoItem[]>([
    { id: 1, text: 'Learn Angular basics', completed: false },
    { id: 2, text: 'Build a Todo app', completed: true }
  ]);

  add(text: string): void {
    this.todos.update((items) => [
      ...items,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ]);
  }

  toggle(id: number): void {
    this.todos.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  remove(id: number): void {
    this.todos.update((items) => items.filter((item) => item.id !== id));
  }
}
