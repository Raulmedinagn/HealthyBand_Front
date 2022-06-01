import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { BandApiService } from './band-api.service';

@Injectable({
  providedIn: 'root'
})
export class LinechartService {

  constructor(private bandApi: BandApiService) { }

  

  data: Object[] = [];

  getWeek() {
    const week = []
    const fecha = new Date();

    for (let i = 9; i > 0; i--) {
      let dia = this.addDaysToDate(fecha, -i);
      week.push(dia)
    }
    return week
  }
  addDaysToDate(date: Date, days: number) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  




}
