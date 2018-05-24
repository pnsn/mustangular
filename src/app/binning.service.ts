import { Injectable } from '@angular/core';
import { Bin } from './Bin';
import * as Rainbow from 'rainbowvis.js'

@Injectable()
export class BinningService {

    constructor() {}
    bins : Array < Bin > ;
    // public count: number,
    // public color:string,
    // public position: number,
    // public layer: string,
    // public max?: number,
    // public min?: number,
    // public width?: string
    getBins(): any {
        return this.bins;
    }

    //min, max, count
    makeBins(binning: any, coloring: any): void {
      console.log(binning.count)
      let bins = new Array < Bin > ();
        let rainbow = new Rainbow();
        let binWidth = (binning.max - binning.min) / binning.count;
        let min = binning.min;

        //Low bin
        bins.push(new Bin( 0, "#000", -1, "icon-group-0", binning.min, null));
        //Middle bins
        
        rainbow.setNumberRange(0, binning.count > 1 ? binning.count - 1 : 1);
        rainbow.setSpectrum(coloring.low, coloring.high);
        var max;
        for (var i = 0; i < binning.count; i++) {
            max = min + binWidth;
            bins.push( new Bin (0, rainbow.colorAt(i), 0,  "icon-group-" + (i + 1), max, min));
            min = max;
        }
    
        // High outlier
        bins.push( new Bin (0, "#808080", 1, "icon-group-" + (binning.count + 1), null, binning.max));

        //No data
        bins.push( new Bin (0, "#fff", 2, "no-data", 0 ,0));
      
        this.bins = bins;
        console.log(this.bins)
    }

    //setBins for use if there is already a min/max from the url

}