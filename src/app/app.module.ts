import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateLayoutComponent } from './shared/layouts/private-layout/private-layout.component';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';

@NgModule({
  declarations: [AppComponent, PublicLayoutComponent, PrivateLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
