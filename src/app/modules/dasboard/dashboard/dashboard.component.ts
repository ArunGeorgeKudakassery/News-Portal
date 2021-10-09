import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocaldataService } from 'src/app/services/localdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public newsList = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private localData: LocaldataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.newsList = data.news.results;
    });
    this.localData.filteredSection.subscribe((val) => console.log(val));
  }
}
