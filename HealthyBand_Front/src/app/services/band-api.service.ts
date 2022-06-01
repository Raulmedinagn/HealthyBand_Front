import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeartRate } from '../interfaces/heartRate';
import { Info } from '../interfaces/info';
import { Activity } from '../interfaces/activity';
import { Bandinfo } from '../interfaces/bandinfo';
import { Battery } from '../interfaces/battery';

@Injectable({
  providedIn: 'root'
})
export class BandApiService {

  private api = 'https://fir-proyecto-73fa0-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    const path = `${this.api}/band/.json`;
    return this.http.get(path);
  }

  getActivity(year: string, month: string, day: string) {
    const path = `${this.api}/band/activity/${year}/${month}/${day}.json`;
    return this.http.get<Activity>(path);
  }

  getHeartRate() {
    const path = `${this.api}/band/rate.json`;
    return this.http.get<HeartRate>(path);
  }
  getInfo() {
    const path = `${this.api}/band/info.json`;
    return this.http.get<Info>(path);
  }
  getBandInfo() {
    const path = `${this.api}/band/bandinfo.json`;
    return this.http.get<Bandinfo>(path);
  }
  getBatery() {
    const path = `${this.api}/band/battery.json`;
    return this.http.get<Battery>(path);
  }
  getStatus() {
    const path = `${this.api}/band/Connected.json`;
    return this.http.get(path);
  }

}
