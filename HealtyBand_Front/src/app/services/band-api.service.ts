import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeartRate } from '../interfaces/heartRate';
import { Info } from '../interfaces/info';

@Injectable({
  providedIn: 'root'
})
export class BandApiService {

  private api = 'https://fir-proyecto-73fa0-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient
  ) { }

  getAllTasks() {
    const path = `${this.api}/band/.json`;
    return this.http.get(path);
  }

  getHeartRate() {
    const path = `${this.api}/band/rate.json`;
    return this.http.get<HeartRate>(path);
  }
  getInfo() {
    const path = `${this.api}/band/info.json`;
    return this.http.get<Info>(path);
  }

  createTask(task: Task) {
    const path = `${this.api}/band`;
    return this.http.post(path, task);
  }

  updateTask(task: Task) {
    const path = `${this.api}/band/${task}`;
    return this.http.put(path, task);
  }

  deleteTask(id: string) {
    const path = `${this.api}/band/${id}`;
    return this.http.delete(path);
  }
}
