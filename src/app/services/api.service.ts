import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private params = {
    'api-key': 'uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7',
  };
  private apiEndpoint = 'https://api.nytimes.com/svc/news/v3/content';
  constructor(private httpClient: HttpClient) {}
  get(path: string, params: any) {
    return this.httpClient.get(`${this.apiEndpoint}/${path}`, { params });
  }
  getSections() {
    return this.get('section-list.json', this.params);
  }
  getAllNews(paginationParams: any) {
    return this.get(`all/all.json`, { ...this.params, ...paginationParams });
  }
}
