import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsResolver } from 'src/app/shared/layouts/resolvers/news.resolve';
import { SectionsResolve } from 'src/app/shared/layouts/resolvers/sections.resolve';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadLaterComponent } from './read-later/read-later.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      sections: SectionsResolve,
      news: NewsResolver,
    },
  },
  {
    path: 'read-later',
    component: ReadLaterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DasboardRoutingModule {}
