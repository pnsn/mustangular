import { Injectable } from '@angular/core';
import { Bin } from './bin';
import * as Rainbow from 'rainbowvis.js'

@Injectable()
export class BinningService {

    constructor() {}
    private bins : Bin[];
   
    getBins() : Bin[] {
      return this.bins;
    }

    makeBins(binning: any, coloring: any): void {

      let bins = new Array < Bin > ();
      let rainbow = new Rainbow();
      let binWidth = (binning.max - binning.min) / binning.count;
      let min = binning.min;

      //Low outliers
      bins.push(new Bin( 0, "#000", -1, "icon-group-0", binning.min, null));
     
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
      bins.push( new Bin (0, "#808080", 1, "icon-group-" + (binning.count + 1), null, binning.max));

      //No data
      bins.push( new Bin (0, "#fff", 2, "no-data", 0 ,0));

      this.bins = bins;

    }

    //setBins for use if there is already a min/max from the url

}