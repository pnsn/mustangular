import { Channel } from './channel'
export class Station {
  
    constructor (
      public net: string,
      public sta: string,
      public lat: number,
      public lon: number,
      public name: string,
      public loc?: string, 
      public code?: string, //NET.STA.LOC
      public channels?: object,
      public displayValues?: number[] 
    ){}
    
    private getAverage(values: number[]) : number {
      let sum = 0;
      for (let value of values) {
        sum += value;
      }
      let average = sum/values.length;
    
      return average;

    }
    //temporary 
    getValue(active: any) : number {
      let channels = active.channels;
      var values = [];
      for (let channel in this.channels) {
        if (channels.length == 0 || channels.indexOf(channel) > -1) {
          values.push(this.channels[channel].getAverage());
        }
      }
      
      values.sort(function(a, b){return a - b});

      if(active.value == "minimum") {
        return values[0];
      } else if (active.value == "maximum") {
        return values[values.length-1];
      } else {
        return this.getAverage(values);
      }
    }
  //value calculation
  //only show values if they are from certain stations
}
