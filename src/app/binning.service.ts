import { Injectable } from '@angular/core';
import { Bin } from './bin';
import * as Rainbow from 'rainbowvis.js'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class BinningService {

    constructor() {}
    private bins = new Subject<Bin[]>;
   
    getBins() : Observable<Bin[]> {
      return this.bins.asObservable();
    }
    
    setBins(bins : Bin[]) : void{
      this.bins.next(bins);
    }
    
    makeBins(display: any): Bin[] {
      let binning = display.binning;
      let data = display.data;
      let coloring = display.coloring;
      
      
      let bins = new Array < Bin > ();
      let rainbow = new Rainbow();
      let binWidth = (binning.max - binning.min) / binning.count;
      let min = binning.min;

      //Low outliers
      bins.push(new Bin( 0, "#000", -1, "icon-group-0", binning.min, data.min));
     
      //Middle bins 
      rainbow.setNumberRange(0, binning.count > 1 ? binning.count - 1 : 1);
      rainbow.setSpectrum(coloring.low, coloring.high);
      var max;
      for (var i = 0; i < binning.count; i++) {
          max = min + binWidth;
          bins.push( new Bin (0, "#" + rainbow.colorAt(i), 0,  "icon-group-" + (i + 1), max, min));
          min = max;
      }
  
      // High outlier
      bins.push( new Bin (0, "#808080", 1, "icon-group-" + (binning.count + 1), data.max, binning.max));

      //No data
      bins.push( new Bin (0, "#fff", 2, "no-data", 0 ,0));

      return bins;
    }

    //setBins for use if there is already a min/max from the url

}