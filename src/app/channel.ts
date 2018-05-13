import { DisplayValue } from './display-value';
import { Measurement } from './measurement';
export class Channel {
  
  constructor (
    public name: string,
    public measurements?: Measurement[]
  ) {}
  
  private getValues() : Array<number> {
    let values = [];
    
    for (let measurement of this.measurements) {
      values.push(measurement.value);
    }
  
    values.sort(function(a, b){return a - b});
    return values;
  }
  
  getMedian() : number {
    let values = this.getValues();
    let mid = values.length / 2 - 0.5;
    let median : number;
    
    if(mid % 1 == 0){
      median = values[mid];
    } else {
      median = (values[mid-.5]+values[mid-.5])/2;
    }
    
    return median;
  }
  
  getAverage() : number {
    let values = this.getValues();
    let sum = 0;
    for (let value of values) {
      sum += value;
    }
    let average = sum/values.length;
    
    return average;

  }
  
}
