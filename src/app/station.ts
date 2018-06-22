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
      public channels?: any
    ){}
    displayValue : number;
    displayChannel : string;
    
    setValue(displayValue : string, displayChannels : string[]) : void {
      this.displayValue = null;
      this.displayChannel = null;
      
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
  //value calculation
  //only show values if they are from certain stations
}
