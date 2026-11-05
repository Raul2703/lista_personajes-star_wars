import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeopleResponse, Person } from '../interfaces/people.interface';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.dev/api/people';

  getPeople(): Observable<Person[]> {
    return this.http.get<PeopleResponse>(this.apiUrl).pipe(
      map((response) =>
        response.results.map((person) => ({ ...person, id: this.getIdFromUrl(person.url) })),
      ),
    );
  }

  // La API no devuelve id: se obtiene de la url (.../people/1/)
  private getIdFromUrl(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
  }
}
