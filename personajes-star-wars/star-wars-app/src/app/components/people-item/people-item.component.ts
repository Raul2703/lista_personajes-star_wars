import { Component, input, output } from '@angular/core';
import { Person } from '../../interfaces/people.interface';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.css',
})
export class PeopleItemComponent {
  readonly person = input.required<Person>();
  readonly personClick = output<Person>();

  onClick(): void {
    this.personClick.emit(this.person());
  }
}
