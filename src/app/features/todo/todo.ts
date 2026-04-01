import { Component, Signal, computed, signal } from '@angular/core';

import { TodoItem, TodoStoreService } from './todo-store.service';

type Filter = 'all' | 'active' | 'completed';

@Component({
  standalone: false,
  selector: 'app-todo',
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class TodoComponent {
  newTask = '';
  selectedFilter = signal<Filter>('all');
  readonly todos: Signal<TodoItem[]>;

  readonly filteredTodos = computed(() => {
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

  constructor(private readonly todoStore: TodoStoreService) {
    this.todos = this.todoStore.todos;
  }

  setFilter(filter: Filter): void {
    this.selectedFilter.set(filter);
  }

  addTodo(): void {
    const text = this.newTask.trim();

    if (!text) {
      return;
    }

    this.todoStore.add(text);
    this.newTask = '';
  }

  toggleTodo(id: number): void {
    this.todoStore.toggle(id);
  }

  deleteTodo(id: number): void {
    this.todoStore.remove(id);
  }
}
