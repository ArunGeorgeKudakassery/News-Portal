import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public showMenu = '';
  public activeMenu = '';
  @Output() currentMenu = new EventEmitter<any>();
  public sections: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSections().subscribe((data: any) => {
      this.sections = data['results'];
    });
  }
  selectSection(section: any) {
    this.activeMenu = section.section;
    this.currentMenu.next(section.display_name);
  }
}
