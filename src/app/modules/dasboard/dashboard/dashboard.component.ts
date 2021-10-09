import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public newsList: Array<any> = [{ multiMedia: [] }];
  public masterNewsList = [];
  public page = 0;
  public offset = 0;
  public limit = 10;
  public totalLength = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.setData(data.news);
    });
  }
  changeNewsList(event: any) {
    this.newsList = this.masterNewsList.filter(
      (news) => news['section'] === event
    );
  }
  openNews(url: string) {
    window.open(url, '_blank')?.focus();
  }
  changePage(dir: string) {
    if (dir === 'prev') {
      this.page--;
    } else {
      this.page++;
    }
    this.offset = this.page * this.limit;
    this.getNewsList();
  }
  getNewsList() {
    const { page, offset, limit } = this;
    this.apiService.getAllNews({ page, offset, limit }).subscribe((data) => {
      this.setData(data);
    });
  }
  setData(data: any) {
    this.masterNewsList = data.results;
    this.newsList = data.results;
    this.totalLength = data.num_results;
  }
  AddToRead(event: MouseEvent, news: any) {
    event.stopPropagation();
    let savedNews = localStorage.getItem('savedNews');
    if (savedNews && savedNews.length) {
      let newsCopy = JSON.parse(savedNews);
      if (!newsCopy.includes(news)) {
        newsCopy.push(news);
        localStorage.setItem('savedNews', JSON.stringify(newsCopy));
        return;
      }
    }
    localStorage.setItem('savedNews', JSON.stringify([news]));
  }
}
