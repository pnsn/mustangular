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
  
  // Changes the active metric and propagates it
  private setActiveMetric(activeMetricName : String) : void {    
    for (let metric of this.metrics) {
      if(metric.name == activeMetricName ){
        this.activeMetric.next(metric);
      }
    }

  }
  
  getMetrics() : Metric[] {
    return Object.assign(this.metrics);
  }

  updateMetrics(metrics : Metric[], activeMetricName : string) : void {
    this.metrics = metrics;
    this.setActiveMetric(activeMetricName);
  
  } 
  
  
  // only happens once
  setMetrics(metrics : Metric[]) : void {
    this.metrics = metrics;
    this.calculateValues();
  }
  
  // Calculates 5th and 95th percentile to bin data
  private initialBinning(values:number[]) : any {
    let length = values.length;
      
    let min = Math.ceil(.05 * length);
    let max = Math.ceil(0.95 * length);
    
    return {
        "max" : length > 0 ? values[max] : 0,
        "min" : length > 0 ? values[min] : 0,
        "count" : 3
    }
  }
  
  //Apply default value, parameter values or calculate new ones. 
  private calculateValues () : void {
    for (let metric of this.metrics) {
      let display = metric.display;
      
      if(this.metricNames.indexOf(metric.name) < 0){
        this.metricNames.push(metric.name);
      }
      
      if(this.parameters.displayValue){
        display.displayValue = this.parameters.displayValue;
      } else {
        display.displayValue = "average";
      }
      

      let values = [];
      for (let s in metric.stations) {
        let station = metric.stations[s];
        station.setValue(display.displayValue, []);
        values.push(station.displayValue);
      }
    
      values.sort(function(a, b){return a - b});
      
      if(values.length > 0) {
        display.data.max = values[values.length-1];
        display.data.min = values[0];
      }

      if(this.parameters.coloring.high && this.parameters.coloring.low) {
        display.coloring = this.parameters.coloring;
      } else {
        display.coloring = {"high" : "#008000", "low" : "#FF0000"};
      }
      if(this.parameters.binning && this.parameters.binning.max && this.parameters.binning.min && this.parameters.binning.count ){
          display.binning = this.parameters.binning;
      } else {
        display.binning = this.initialBinning(values);
      
      }
      
      metric.display = display;
    }
    this.activeMetric.next(this.metrics[0]);
  }
}
