import { Values } from './values'
export class Metric {

  stations?: object;
  data?: any;
  coloring?: any;
  binning?: any;
  displayValue?: string;

  constructor (
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string
  ) {
    this.stations = {}
    this.data = {"min" : null, max: "null", count: 0};
    
    this.coloring = {
      'low' : null,
      'high' : null
    }
    
    this.binning = {"min" : null, max: "null", count: 0};
    
    this.displayValue = "";
  }
  
  //calculate percentiles
  
//values: {
  //min
  //max
  //count
// }  
  
  //add station
}
