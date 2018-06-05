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
  }
  
  private initialBinning(values:number[]) : any {
  
    let length = values.length;
    
    let min = Math.ceil(.05 * length);
    let max = Math.ceil(0.95 * length);
    console.log(min,max)
    
    
    return {
        "max" : values[max],
        "min" : values[min],
        "count" : 3
      }
  
  }
  
  private calculateValues () : void {
    for (let metric of this.metrics) {
      if(this.metricNames.indexOf(metric.name) < 0){
        this.metricNames.push(metric.name);
      }
      
      if(this.parameters.displayValue){
        metric.displayValue = this.parameters.displayValue;
      } else {
        metric.displayValue = "average";
      }
      

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

      if(this.parameters.coloring.high && this.parameters.coloring.low) {
        metric.coloring = this.parameters.coloring;
      } else {
        metric.coloring = {"high" : "#0000ff", "low" : "#ffffff"};
      }
      if(this.parameters.binning && this.parameters.binning.max && this.parameters.binning.min && this.parameters.binning.count ){
          metric.binning = this.parameters.binning;
      } else {
        metric.binning = this.initialBinning(values);
      
      }
    }
    this.setActiveMetric(this.metrics[0].name);
    console.log(this.metrics)
  }
}
