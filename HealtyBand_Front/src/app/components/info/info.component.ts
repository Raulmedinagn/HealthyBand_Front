import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { BandApiService } from '../../services/band-api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  calorias: number[] = []
  grasas: number[] = []
  metros: number[] = []
  pasos: number[] = []
  ancho:number = 0;
  alto:number = 0;

  constructor(private bandApi: BandApiService) { }

  ngOnInit(): void {

    
    var options = {
      colors: ["#4d84dc", "#f2de2c", "#20b03a", "#f27b2c"],
      series: [{
        data: []
      }],
      chart: {
        type: 'bar',
        height: 311,
        width: '100%',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false,
      },
      noData: {
        text: "Cargando...",
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
        categories: ['Pasos', 'Metros', 'Calorias', 'Grasas Quemadas'],
      }
    };

    var chart = new ApexCharts(document.querySelector("#chartInfo"), options);
    chart.render();


    try {
      this.getApi();
      setTimeout(() => {

        chart.updateSeries([
          {
            name: "Pasos",
            data: this.pasos
          },
          {
            name: "Metros",
            data: this.metros
          },
          {
            name: "Calorias",
            data: this.calorias
          },
          {
            name: "Grasas Quemadas",
            data: this.grasas
          }
        ])
      }, 1000);
    }
    catch (e) {
      alert(e)
    }
    setInterval(() => {
      var div = document.getElementById('chartInfo')!;
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      this.ngOnInit()
    }, 300000)
  }



  getApi() {
    this.bandApi.getInfo()
      .subscribe(resp => {

        if (resp.Steps == undefined || resp.Steps == null || resp.Steps == NaN) {
          resp.Steps = 0
        }
        if (resp.Meters == undefined || resp.Meters == null || resp.Meters == NaN) {
          resp.Meters = 0
        }
        if (resp.Calories == undefined || resp.Calories == null || resp.Calories == NaN) {
          resp.Calories = 0
        }
        if (resp.Fat_burned == undefined || resp.Fat_burned == null || resp.Fat_burned == NaN) {
          resp.Fat_burned = 0
        }
        if (resp.Calories < 0) {
          resp.Calories += 256
        }
        this.calorias = []
        this.grasas = []
        this.metros = []
        this.pasos = []
        this.metros.push(resp.Meters)
        this.pasos.push(resp.Steps)
        this.calorias.push(resp.Calories)
        this.grasas.push(resp.Fat_burned)
      });
  }
}
