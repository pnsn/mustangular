import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {

  constructor() { }

  private parameters : any;
  private metrics : Metric[];
  private activeMetric = new Subject<Metric>();
  private metricNames : string[] = [];
  setDisplay(parameters : any) : void {
    this.parameters = parameters;
  } 
  
  getActiveMetric() : Observable<Metric> {
    return this.activeMetric.asObservable();
  } 
  
  setActiveMetric(metricName : string) : void {
    
    for (let metric of this.metrics) {
      if(metric.name == metricName ){
         this.activeMetric.next(metric);
      }
    }

  }
  
  getMetricNames() : string[] {
  
    return this.metricNames;
  
  }
  
  setMetrics(metrics : Metric[]) : void {
    this.metrics = metrics;
    this.calculateValues();
    this.setActiveMetric(this.metrics[0].name)
  }
  
  private calculateValues () : void {
    for (let metric of this.metrics) {
      this.metricNames.push(metric.name);
      metric.binning = this.parameters.binning;
      metric.coloring = this.parameters.coloring;
      metric.displayValue = this.parameters.displayValue;
      
      let values = [];
      for (let s in metric.stations) {
        let station = metric.stations[s];
        station.setValue(metric.displayValue, []);
        values.push(station.displayValue);
      }
    
      values.sort(function(a, b){return a - b});
      
      if(values.length > 0) {
        metric.data.max = values[values.length-1];
        metric.data.min = values[0];
      }
    }
    console.log(this.metrics)
  }
}
