// Describes a Metric object

// {
//   name : string,
//   title : string,
//   description : string,
//   unit : string,
//   display : Display,
//   stations : Station object
// }

import { Display } from './display'
export class Metric {
  
  constructor (
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string,
    public tables?: any
  ) {
    this.display = new Display();
    this.stations = {}
    this.setDisplayType();
  }
  
  display : Display; // Metric's display settings
  stations : any; // Metric's stations 
  private values : Array<number>; // Metric's display values
  
  // Set new values for Metric and it's stations
  updateValues() : void {
  
    let values = [];

    for (let s in this.stations) {
      let station = this.stations[s];
      // New value for the stations
      station.setValue(this.display.displayValue, this.display.channels.available);
      values.push(station.displayValue);
    }
    
    values.sort(function(a, b){return a - b});
    
    if(values.length > 0) {
      this.display.data.max = values[values.length-1];
      this.display.data.min = values[0];
    }
  
    this.values = values;
    this.getActiveChannels();
  }
  
  
  // Returns metric's values
  getValues() : Array<number> {
    return this.values;
  }
  
  // Return all of metric's channels 
  getChannels() : Array<string> {
    let channels = [];
    for (let s in this.stations) {
      let station = this.stations[s];
      for ( let c in station.channels ) {
        if(channels.indexOf(c) < 0 ){
          channels.push(c);
        }
      }
    }
    return channels;
  }
  
  // Return the channels that are actually being used
  private getActiveChannels() : void {
    let availableChannels = this.display.channels.available;
    let activeChannels = [];
    for (let s in this.stations) {
      let station = this.stations[s];
      let c = station.displayChannel.split(".")[1]
      if(activeChannels.indexOf(c) < 0 ){
        activeChannels.push(c);
      }
    }
    this.display.channels.active = availableChannels.filter(channel => activeChannels.indexOf(channel) > -1);
  }

  private setDisplayType() : void{
    let dType : string;
    if( this.description.search(/percent/i) > -1 ) {
      dType = "percent";
    } else if ( this.description.search(/boolean/i) > -1 ) {
      dType = "boolean";
    } else if ( this.description.search(/polarity/i) > -1 ) {
      dType = "polarity";
    }
    this.display.displayType = dType;
  }
}
