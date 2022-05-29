import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeartRateComponent } from './components/heart-rate/heart-rate.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StepsComponent } from './components/steps/steps.component';
import { CaloriesComponent } from './components/calories/calories.component';
import { FatBurnedComponent } from './components/fat-burned/fat-burned.component';
import { MetersComponent } from './components/meters/meters.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HeartRateComponent,
    StepsComponent,
    CaloriesComponent,
    FatBurnedComponent,
    MetersComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
