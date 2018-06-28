// Describes a Display object

// {
//   data : {
//     max : number
//     min : number
//     count : number
//   },
//   coloring : {
//     low : color,
//     high : color
//   },
//   binning : {
//     min : number,
//     max : number,
//     count : number
//   },
//   displayValue : string,
//   channels : {
//     active : string array,
//     available : string array
//   }
// }

export class Display {
  data : any;
  coloring : any;
  binning : any;
  displayValue : string;
  channels: any;
  
  constructor(){
    
    // Data's max, min, and number of data points
    this.data = { 
      "min" : null,
      "max": null,
      "count": 0
    };
    
    // High and low color selections
    this.coloring = {
      "low" : null,
      "high" : null
    };
    
    // Upper and lower bounds for bins and number of bins
    this.binning = {
      "min" : null, 
      "max": null, 
      "count": 0
    };
    
    // Currently selected value to display for stations
    this.displayValue = "";  
    
    // Channels to calculate on
    this.channels = {
      "active" : <string[]>  null,
      "available" : <string[]> null
    };
  }
  
  //Returns a URL friendly string of the Display
  toString() : string {
    let string = 
      "&high=" + this.coloring.high.replace(/#/, "%23") +
      "&low=" + this.coloring.low.replace(/#/, "%23") +
      "&count=" + this.binning.count +
      "&min=" + this.binning.min +
      "&max=" + this.binning.max + 
      "&value=" + this.displayValue + 
      "&channels=" + this.channels.active; 
    return  string ;
  }
}



