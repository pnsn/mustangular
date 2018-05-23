import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveService {
  constructor() { }
  
  
  private metricIndex = new BehaviorSubject<number>(0);
  getActiveMetricIndex = this.metricIndex.asObservable();

  private channels = new BehaviorSubject<Array<string>>([]);
  getActiveChannels = this.channels.asObservable();
  
  private value = new BehaviorSubject<string>("");
  getActiveValue = this.value.asObservable();
  

  changeMetric(metricIndex: number) {
    this.metricIndex.next(metricIndex);
    console.log("change the metric")
  }
  
  changeChannels(channels: Array<string>) {
    this.channels.next(channels);
    console.log("change the channels");
  }
  
  changeValue(value: string) {
    this.value.next(value);
    console.log("change the channels");
  }
}