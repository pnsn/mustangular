import { Measurement } from './measurement';
export class Channel {
  
  constructor (
    public name: string,
    public measurements?: Measurement[]
  ) {}
  
  private values : Array<number>;
  private median? : number;
  private average? : number;
  private max? : number;
  private min? : number;
  
  private calculateValues() : void {
    if ( !this.values || this.values.length == 0 ) {
      let values = [];
    
      for (let measurement of this.measurements) {
        values.push(measurement.value);
      }
  
      values.sort(function(a, b){return a - b});
      this.values = values;
      this.max = values[values.length - 1];
      this.min = values[0];
    }
  }
  
  getMedian() : number {
    if( !this.median ) {
      this.calculateValues();
      
      let mid = this.values.length / 2 - 0.5;
      let median : number;
    
      if(mid % 1 == 0){
        median = this.values[mid];
      } else {
        median = (this.values[mid-.5]+ this.values[mid-.5])/2;
      }
    
      this.median = median;
    }
    return this.median;


  }
  
  getAverage() : number {
    if( !this.average ) {
      this.calculateValues();
      
      let sum = 0;
      for (let value of this.values) {
        sum += value;
      }
      let average = sum/this.values.length;
      this.average = average;
    }
    return this.average;

  }
  
  // Returns requested percentile, probably
  getPercentile(percentile : number) : number {
    this.calculateValues();
    
    let index = Math.ceil(percentile / 100 * this.values.length);
    return index == this.values.length ? this.values[index - 1] : this.values[index];
  
  }
  
  getMax() : number {
    this.calculateValues();
    return this.max;
  }
  
  getMin() : number {
    this.calculateValues();
    return this.min;
  }
  
}
