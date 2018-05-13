import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveService {
  private metric = new BehaviorSubject<string>("");
  getActiveMetric = this.metric.asObservable();

  private channels = new BehaviorSubject<Array<string>>([]);
  getActiveChannels = this.channels.asObservable();
  constructor() { }

  changeMetric(metricName: string) {
    this.metric.next(metricName);
    console.log("change the metric")
  }
  
  changeChannels(channels: Array<string>) {
    this.channels.next(channels);
    console.log("change the channels");
    
  }
}