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
      public channels?: any,
      public displayValue? : number
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
    setValue(displayValue : string, chans:string[]) : void {
      let selectedChannels = chans;
      var values = [];
      for (let channel in this.channels) {
        if (selectedChannels.length == 0 || selectedChannels.indexOf(channel) > -1) {
          values.push(this.channels[channel].getAverage());
        }
      }
      
      values.sort(function(a, b){return a - b});
      
      if(values.length == 0) {
        this.displayValue = null;
      } else if(displayValue == "minimum") {
        this.displayValue = values[0];
      } else if (displayValue == "maximum") {
        this.displayValue = values[values.length-1];
      } else {
        this.displayValue = this.getAverage(values);
      }
    }
  //value calculation
  //only show values if they are from certain stations
}
