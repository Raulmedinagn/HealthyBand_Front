import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { BandApiService } from 'src/app/services/band-api.service';
import { LinechartService } from 'src/app/services/linechart.service';
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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild("chartHtml")
  chart!: ChartComponent;

  steps: number[] = []
  fechas: string[] = []

  todos: Activity[] = []

  datos: Activity = {
    Date: '',
    Heart_rate_average: 0,
    Intensity: 0,
    steps: 0
  }

  constructor(private bandApi: BandApiService, private lineChartService: LinechartService) { }


  ngOnInit(): void {
    this.setWeekChart();
    var options = {
      series: [
        {
          name: "Pasos",
          data: []
        }
      ],
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
        curve: "straight"
      },
      title: {
        text: "Pasos",
        align: "left"
      },
      noData: {
        text: "Loading",
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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    try {
      chart.updateOptions({
        xaxis: {
          categories: this.fechas
        }
      });
      this.getTodos();
      setTimeout(() => {
        chart.updateSeries([
          {
            name: "Pasos",
            data: this.steps
          }
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
        this.steps.push(element.steps)
      })
    }, 500);
  }
}
