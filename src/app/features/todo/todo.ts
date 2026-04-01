import { Component, computed, effect, signal } from '@angular/core';
type Filter = 'all' | 'active' | 'completed';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  standalone: false,
  selector: 'app-todo',
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  private readonly storageKey = 'todos';

  newTask = '';
  selectedFilter = signal<Filter>('all');

  todos = signal<TodoItem[]>(this.loadTodos());

  filteredTodos = computed(() => {
    const currentFilter = this.selectedFilter();
    const items = this.todos();

    if (currentFilter === 'active') {
      return items.filter((item) => !item.completed);
    }

    if (currentFilter === 'completed') {
      return items.filter((item) => item.completed);
    }

    return items;
  });

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos()));
    });
  }

  setFilter(filter: Filter): void {
    this.selectedFilter.set(filter);
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
