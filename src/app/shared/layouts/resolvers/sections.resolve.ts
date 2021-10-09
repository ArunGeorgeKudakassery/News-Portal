import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsResolve implements Resolve<any> {
  constructor(private apiService: ApiService) {}
  resolve() {
    return this.apiService.getSections().pipe(catchError((err) => of(null)));
  }
}
