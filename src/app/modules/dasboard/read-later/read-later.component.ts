import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.scss'],
})
export class ReadLaterComponent implements OnInit {
  public limit = 10;
  public page = 0;
  public offset = 0;
  public masterValueList = [];
  public masterSavedNewsList = localStorage.getItem('savedNews');
  public savedNews = [];

  constructor() {}

  ngOnInit(): void {
    this.getNewsList();
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
    if (this.masterSavedNewsList && this.masterSavedNewsList.length) {
      const masterList = JSON.parse(this.masterSavedNewsList);
      this.masterValueList = masterList;
      this.savedNews = JSON.parse(
        JSON.stringify(masterList.splice(this.offset, this.offset + this.limit))
      );
      return;
    }
    this.savedNews = [];
  }
  removeFromList(news: any) {
    if (this.masterSavedNewsList && this.masterSavedNewsList.length) {
      let parsedArray = [...JSON.parse(this.masterSavedNewsList)];
      const removingIndex = parsedArray.findIndex(
        (item: any) => item.url === news.url
      );
      parsedArray.length === 1
        ? (parsedArray = [])
        : parsedArray.splice(removingIndex, 1);
      localStorage.setItem('savedNews', JSON.stringify(parsedArray));
      this.masterSavedNewsList = JSON.stringify(parsedArray);
      this.getNewsList();
    }
  }
  openNews(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
