import { BandApiService } from '../services/band-api.service';
import { Component, OnInit } from '@angular/core';
import { HeartRate } from '../interfaces/heartRate';
import { interval, Observable } from 'rxjs';


@Component({
  selector: 'app-heart-rate',
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.scss']
})
export class HeartRateComponent implements OnInit {

  obj: HeartRate = {
    Heart_rate: 0
  };
  

  constructor(private bandApi: BandApiService) { }

  ngOnInit(): void {
    this.getRate();
    interval(1000).subscribe(() => this.getRate())
  }

  getRate() {
    this.bandApi.getHeartRate()
    .subscribe(resp => {
      this.obj = resp
    });
  }

}
