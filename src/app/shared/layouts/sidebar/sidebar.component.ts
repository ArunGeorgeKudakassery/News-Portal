import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocaldataService } from 'src/app/services/localdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public showMenu = '';
  public activeMenu = '';
  public sections: any[] = [];
  constructor(
    private apiService: ApiService,
    private localData: LocaldataService
  ) {}

  ngOnInit(): void {
    this.apiService.getSections().subscribe((data: any) => {
      this.sections = data['results'];
    });
  }
  selectSection(section: any) {
    this.activeMenu = section;
    this.localData.filteredSection.next(section);
  }
}
