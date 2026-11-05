import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from '../../interfaces/people.interface';
import { PeopleService } from '../../services/people.service';
import { PeopleItemComponent } from '../people-item/people-item.component';

@Component({
  selector: 'app-people-list',
  imports: [PeopleItemComponent],
  templateUrl: './people-list.component.html',
})
export class PeopleListComponent implements OnInit {
  private readonly peopleService = inject(PeopleService);
  private readonly modalService = inject(NgbModal);
  private readonly personModal = viewChild.required<TemplateRef<unknown>>('personModal');

  readonly peopleList = signal<Person[]>([]);
  readonly selectedPerson = signal<Person | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.peopleList.set(people);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  openModal(person: Person): void {
    this.selectedPerson.set(person);
    this.modalService.open(this.personModal());
  }
}
