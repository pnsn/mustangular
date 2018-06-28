// Generates bins to color map icons

import { Injectable } from '@angular/core';
import { Bin } from './bin';
import * as Rainbow from 'rainbowvis.js'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BinningService {

    constructor() {}
    
    private bins = new Subject<Bin[]>(); // Subscribeable bins
    private activeLayers = new Subject<any>(); // Subscribeable layer statuses
  
    // Returns the status of the layers
    getActiveLayers() : Observable<any> {
      return this.activeLayers.asObservable();
    }
  
    // Sets the layers
    setActiveLayers(layers) : void {
      this.activeLayers.next(layers);
    }
     
    // Returns the bins
    getBins() : Observable<Bin[]> {
      return this.bins.asObservable();
    }
    
    // Sets the bins
    setBins(bins : Bin[]) : void{
      this.bins.next(bins);
    }
    
    // Creates the bins
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
      bins.push( new Bin (0, "#fff", 2, "no-data" + (binning.count + 2), 0 ,0));
  
      return bins;
    }
}