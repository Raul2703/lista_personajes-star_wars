import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PeopleListComponent } from './components/people-list/people-list.component';

@Component({
  imports: [NgbModule, PeopleListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
