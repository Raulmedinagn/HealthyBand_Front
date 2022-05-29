import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { BandApiService } from 'src/app/services/band-api.service';
import { LinechartService } from 'src/app/services/getweek.service';
import * as ApexCharts from 'apexcharts';
import { elementAt, Observable, forkJoin } from 'rxjs';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";




export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-chart-2',
  templateUrl: './line-chart-2.component.html',
  styleUrls: ['./line-chart-2.component.scss']
})
export class LineChart2Component implements OnInit {
  rate: number[] = []
  intensity: number[] = []
  fechas: string[] = []
  steps: number[] = []

  todos: Activity[] = []

  datos: Activity = {
    Date: '',
    Heart_rate_average: 0,
    Intensity: 0,
    steps: 0,
    Total_Calories: 0
  }

  constructor(private bandApi: BandApiService, private lineChartService: LinechartService) { }


  ngOnInit(): void {
    this.setWeekChart();
    var options = {
      colors:["#4d84dc"],
      series: [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "",
        align: "left"
      },

      noData: {
        text: "Cargando...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
      },
      grid: {
        row: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };

    var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
    chart2.render();

    try {
      chart2.updateOptions({
        xaxis: {
          categories: this.fechas
        }
      });
      this.getTodos();
      setTimeout(() => {
        chart2.updateSeries([
          {
            name: "Pasos",
            data: this.steps
          },
        ])
      }, 1000);

    }
    catch (e) {
      alert(e)
    }

  }

  setWeekChart() {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
    ];
    let week = this.lineChartService.getWeek()
    let date: string;

    week.forEach(element => {
      date = `${(element.getDate()).toString()} ${monthNames[element.getMonth()]}`
      this.fechas.push(date)
    });
  }

  getTodos() {
    let week = this.lineChartService.getWeek()

    for (const day of week) {
      this.bandApi.getActivity(day.getFullYear().toString(), `0${(day.getMonth() + 1).toString()}`, day.getDate().toString())
        .subscribe(resp => {
          this.todos.push(resp);
        });
    }

    setTimeout(() => {
      this.todos.sort(function (a, b) {
        // A va primero que B
        if (new Date(a.Date).getTime() < new Date(b.Date).getTime())

          return -1;
        // B va primero que A
        else if (new Date(a.Date).getTime() > new Date(b.Date).getTime())
          return 1;
        // A y B son iguales
        else
          return 0;
      });
      this.todos.forEach(element => {
        this.rate.push(element.Heart_rate_average)
        this.intensity.push(element.Intensity)
        this.steps.push(element.steps)
      })
    }, 500);
  }
}
