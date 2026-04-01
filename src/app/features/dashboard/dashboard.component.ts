import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly kpis = [
    { title: 'Open Tasks', value: '18' },
    { title: 'In Review', value: '6' },
    { title: 'Completed This Week', value: '42' }
  ];
}
