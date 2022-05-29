import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { BandApiService } from 'src/app/services/band-api.service';
import { LinechartService } from 'src/app/services/linechart.service';
import * as ApexCharts from 'apexcharts';

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
import { elementAt } from 'rxjs';



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
  //public chartOptions: ChartOptions;

  todos: number[] = []

  datos: Activity = {
    Heart_rate_average: 0,
    Intensity: 0,
    steps: 0
  }

  constructor(private bandApi: BandApiService, private lineChartService: LinechartService) {
    /* this.chartOptions = {
      series: [
        {
          name: "Pasos",
          data: [8, 4, 67, 4, 7]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    }; */
  }


  ngOnInit(): void {
    this.setWeekChart();
  }
  ngAfterViewInit() {
    var options = {
      series: [
        {
          name: "Pasos",
          data: [8, 4, 67, 4, 7]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    try {
      chart.updateOptions({
        title: {
          text: 'new title'
        }
      })
      this.getTodos();
      setTimeout(() => {
        console.log(this.todos);
        chart.updateSeries([
          {
            name: "Pasos",
            data: this.todos
          }
        ])
      }, 500);

    }
    catch (e) {
      alert(e)
    }

  }

  setWeekChart() {
    //this.chartOptions.xaxis.categories = [];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
    ];
    let week = this.lineChartService.getWeek()
    let date: string;

    week.forEach(element => {
      date = `${(element.getDate()).toString()} ${monthNames[element.getMonth()]}`
      //this.chartOptions.xaxis.categories.push(date)
    });
  }

  async getTodos() {
    let week = this.lineChartService.getWeek()

    for (const day of week) {
      (await this.bandApi.getActivity(day.getFullYear().toString(), `0${(day.getMonth() + 1).toString()}`, day.getDate().toString()))
        .subscribe(resp => {
          this.datos = resp;
          this.todos.push(resp.Heart_rate_average);
          console.log("llamada " + day.getDate().toString())
        });
    }





    /* week.forEach(element => {
      //console.log(element)

      this.getDataApi(element.getFullYear().toString(), `0${(element.getMonth() + 1).toString()}`, element.getDate().toString())


    }); */


  }

  // getDataApi(year: string, month: string, day: string) {
  //   return new Promise((resolve, reject) => {
  //     this.bandApi.getActivity(year, month, day)
  //       .subscribe(resp => {
  //         this.datos = resp;
  //         //this.todos.unshift(resp.Heart_rate_average);
  //         console.log("llamada " + day)
  //       });
  //     resolve(this.datos)
  //   })

  // }




}
