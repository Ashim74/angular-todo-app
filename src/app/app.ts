import { Component } from '@angular/core';
import { TodoComponent } from './features/todo/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
