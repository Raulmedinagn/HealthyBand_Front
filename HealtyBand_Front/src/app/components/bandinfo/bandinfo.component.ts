import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Battery } from 'src/app/interfaces/battery';
import { BandApiService } from '../../services/band-api.service';

@Component({
  selector: 'app-bandinfo',
  templateUrl: './bandinfo.component.html',
  styleUrls: ['./bandinfo.component.scss']
})
export class BandinfoComponent implements OnInit {

  constructor(private bandApi: BandApiService) { }

  connected!: Object;
  battery: Battery = {
    Battery: 0
  };

  ngOnInit(): void {
    this.getStatus();
    this.getBattery();
    interval(60000).subscribe(() => {
      this.getBattery();
    });
  }

  getStatus() {
    interval(1000).subscribe(() => {
      this.bandApi.getStatus()
        .subscribe(resp => {
          this.connected = resp
        });
    })
  }
  getBattery() {
    let div = document.getElementById('div_color')!
    this.bandApi.getBatery()
      .subscribe(resp => {
        this.battery = resp
        if (resp.Battery >= 50) {
          if (div.classList.contains("yellow")) {
            div.classList.remove("yellow")
          }
          if (div.classList.contains("red")) {
            div.classList.remove("red")
          }
          div.classList.add("green")
        }
        if (resp.Battery > 20 && resp.Battery < 50) {
          if (div.classList.contains("green")) {
            div.classList.remove("green")
          }
          if (div.classList.contains("red")) {
            div.classList.remove("red")
          }
          div.classList.add("yellow")

        }
        if (resp.Battery <= 20) {
          if (div.classList.contains("yellow")) {
            div.classList.remove("yellow")
          }
          if (div.classList.contains("green")) {
            div.classList.remove("green")
          }
          div.classList.add("red")
        }
      });

  }
}
