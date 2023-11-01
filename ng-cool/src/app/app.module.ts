import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import PcMonitorComponent from './pc-monitor.component';
// import { PcMonitorComponent } from './pc-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    PcMonitorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
