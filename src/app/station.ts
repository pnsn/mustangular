import { Measurement } from '../measurement'
export class Station {
  
    constructor (
      public net: string,
      public sta: string,
      public lat: number,
      public lon: number,
      public name: string,
      public channels?: array,
      public measurements?: any
    ){}
    
    addMeasurements(measurements: Measurement[]): void { 
      console.log(measurements)

     
   }
 
   addChannels(channel: string): void { 
     

    
  }
    
}
