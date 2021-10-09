import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionsResolve } from 'src/app/shared/layouts/resolvers/sections.resolve';
import { DasboardRoutingModule } from './dasboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DasboardRoutingModule],
  providers: [SectionsResolve],
})
export class DasboardModule {}
