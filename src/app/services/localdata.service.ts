import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaldataService {
  public filteredSection = new BehaviorSubject('');
  constructor() {}
}
