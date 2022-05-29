import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BandApiService } from '../../services/band-api.service';
import { Info } from '../../interfaces/info';

@Component({
  selector: 'app-fat-burned',
  templateUrl: './fat-burned.component.html',
  styleUrls: ['./fat-burned.component.scss']
})
export class FatBurnedComponent implements OnInit {

  
  obj: Info = {
    Calories: 0,
    Fat_Burned: 0,
    Meters: 0,
    Steps: 0
  };
  

  constructor(private bandApi: BandApiService) { }


  ngOnInit(): void {
    this.getApi();
    //interval(1000).subscribe(() => this.getApi())
  }

  getApi() {
    this.bandApi.getInfo()
    .subscribe(resp => {
      this.obj = resp
    });
  }

}
