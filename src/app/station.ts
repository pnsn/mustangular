// Describes a Station object
// {
//   net: string,
//   sta: string,
//   lat: number,
//   lon: number,
//   name: string,
//   loc: string,
//   code: string, //NET.STA.LOC
//   channels: any
// }

import { Channel } from './channel'
export class Station {
  
    constructor (
      public net: string,
      public sta: string,
      public lat: number,
      public lon: number,
      public name: string,
    ){
      this.code = ""; //NET.STA.LOC
      this.channels = {};
      this.displayValue = null;
      this.displayChannel = null;
      this.qual = "";
    }
    code: string
    channels: any;
    qual: string;
    displayValue : number; // Value displayed for the station
    displayChannel : string; // Channel being used to display
    
    // Sets the station value according to the display value and selected channels
    setValue(displayValue : string, displayChannels : string[]) : void {
      for (let displayChannel of displayChannels ){
        if ( this.channels[displayChannel] ) {
          let channel = this.channels[displayChannel];
          this.displayChannel = channel.name;
          
          switch(displayValue) {
            case "Minimum" : {
              this.displayValue = channel.getMin();
              break;
            }
            case "Maximum" : {
              this.displayValue = channel.getMax();
              break;
            }
            case "Average" : {
              this.displayValue = channel.getAverage();
              break;
            }
            case "5th Percentile" : {
              this.displayValue = channel.getPercentile(5);
              break;
            }
            case "95th Percentile" : {
              this.displayValue = channel.getPercentile(95);
              break;
            }
            default : {
              this.displayValue = null;
              break;
            }
          }
          
          if(displayChannel) {
            break;
          }
        }
      }
    }
}
