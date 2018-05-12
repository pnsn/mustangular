import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveService {
  private metric = new BehaviorSubject<string>("");
  getActive = this.metric.asObservable();

  constructor() { }

  changeMetric(metricName: string) {
    this.metric.next(metricName);
    console.log("change the metric")
  }

}