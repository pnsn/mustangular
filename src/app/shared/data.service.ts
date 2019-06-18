import { Injectable } from '@angular/core';
import { Metric } from '../metric';
import { Subject ,  Observable } from 'rxjs';
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
        metric.updateValues();
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
  
  // Calculates 5th and 95th percentile of data
  // gets weird when there's only a few values
  private initialBinning(values:number[]) : any {
    let length = values.length; 
    let minIndex = Math.ceil(.05 * length) - 1;
    let maxIndex = Math.floor(0.95 * length); 

    let max, min, count: number;
    console.log(values[0], values[minIndex], values[maxIndex], values[length - 1])
    if (values[minIndex] == values[0] && values[maxIndex] == values[length - 1]){ // 5%ile is min and 95%ile is max
      count = 2;
      console.log("min and max are %iles")
    } else if (minIndex == maxIndex || values[maxIndex] - values[minIndex] < 1) { // small data set or range
      count = 1;
      console.log("small data or range")
    } else {
      count = 3;
    }
    return {
        "max" : length > 0 && values[maxIndex]? +values[maxIndex].toFixed(2) : 1,
        "min" : length > 0 && values[minIndex]? +values[minIndex].toFixed(2) : 0,
        "count" : count
    }
  }
  
  private sortChannels(channels : Array <string>) : Array <string> {
    if(channels.length > 0){
      let displayChannels = [];
      for ( let channel of channels) {
        let c = channel.split(".")[1];
        if (displayChannels.indexOf(c) == -1 ){
          displayChannels.push(c);
        }
      }
      return displayChannels;
    } else {
      return channels;
    }
  }
  
  //Apply default value, parameter values or calculate new ones. 
  private calculateValues () : void {
    let defaultMetric = null;
    for (let metric of this.metrics) {
      let display = metric.display;
      
      if(this.metricNames.indexOf(metric.name) < 0){
        this.metricNames.push(metric.name);
      }
      
      if(this.parameters.displayValue){
        display.displayValue = this.parameters.displayValue;
      } else {
        display.displayValue = "Average";
      }
      
      display.invert = this.parameters.invert ? this.parameters.invert : false;
      
      display.channels.available = this.sortChannels(metric.getChannels()); 
      
      metric.updateValues();
      
      let values = metric.getValues();

      if(this.parameters.coloring) {
        display.coloring = this.parameters.coloring;
      } else {
        display.coloring = "red_to_green";
      }

      if(this.parameters.binning &&
          this.parameters.binning.max != null &&
          this.parameters.binning.min != null &&
          this.parameters.binning.count != null){
        display.binning = this.parameters.binning;
      } else {
        display.binning = this.initialBinning(values);
      }
      
      metric.display = display;
      
      if(defaultMetric == null && metric.display.data.count > 0) {
        defaultMetric = metric;
      }

    }
    if (defaultMetric) {
      this.activeMetric.next(defaultMetric);
    } 

  }
}
