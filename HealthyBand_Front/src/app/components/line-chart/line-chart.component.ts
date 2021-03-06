import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity';
import { BandApiService } from 'src/app/services/band-api.service';
import { LinechartService } from 'src/app/services/getweek.service';
import * as ApexCharts from 'apexcharts';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  fatburned: number[] = []
  calories: number[] = []
  rate: number[] = []

  fechas: string[] = []

  todos: Activity[] = []

  datos: Activity = {
    Date: '',
    Heart_rate_average: 0,
    Intensity: 0,
    Total_Steps: 0,
    Total_Calories: 0,
    Total_Fatburned: 0,
    Total_Meters: 0
  }


  constructor(private bandApi: BandApiService, private lineChartService: LinechartService) { }


  ngOnInit(): void {
    this.setWeekChart();

    var options = {
      colors: ["#1e9d70", "#bf3535",'#ffc060'],
      series: [],
      chart: {
        type: "line",
        height: 311,
        width: '100%',
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
        text: "Cargando Registros...",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "white",
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
      },
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
            name: "Calorias",
            data: this.calories
          },
          {
            name: "Pulsaciones",
            data: this.rate
          },
          {
            name: "Grasas Quemadas",
            data: this.fatburned
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
      if ((day.getMonth() + 1) < 10) {
        var mes = `0${(day.getMonth() + 1).toString()}`
      } else {
        var mes = (day.getMonth() + 1).toString()
      }
      this.bandApi.getActivity(day.getFullYear().toString(), mes, day.getDate().toString())
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
        this.calories.push(element.Total_Calories)
        this.fatburned.push(element.Total_Fatburned)
        this.rate.push(element.Heart_rate_average)
      })
    }, 500);
  }
}
