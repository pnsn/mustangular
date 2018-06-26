export class Display {
  data : any;
  coloring : any;
  binning : any;
  displayValue : string;
  channels: any;
  
  constructor(){
    this.data = { 
      "min" : null,
      "max": null,
      "count": 0
    };
    
    this.coloring = {
      "low" : null,
      "high" : null
    };
    
    this.binning = {
      "min" : null, 
      "max": null, 
      "count": 0
    };
    
    this.displayValue = "";  
    
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


