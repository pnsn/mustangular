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
    
    //temporary 
    getValue(channels: Array<string>) : number {
      var value = 0;
      for (let channel in this.channels) {
        if (channels.length == 0 || channels.indexOf(channel) > -1) {
          for (let measurement of this.channels[channel].measurements) {
            value += measurement.value;
          }
        }
      }
      return value;
    }
  //value calculation
  //only show values if they are from certain stations
}
