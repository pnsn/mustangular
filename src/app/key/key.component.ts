// Generates the key

import { Component, OnInit } from '@angular/core';
import { BinningService } from '../shared/binning.service';
import { Bin } from '../bin';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  constructor (
    private binningService : BinningService
  ) {}

  bins : Bin[]; // Bins
  layers :any = {}; // Which layers are on the map
  
  ngOnInit() {
    // Waits for bins to be created
    this.binningService.getBins().subscribe(
      bins => { 
        this.bins = bins;
      }
    );
    
    // Subscribes to changes in the metric layers 
    this.binningService.getActiveLayers().subscribe(
      layers => { 
        this.layers = layers;
      }
    );
  }  
  
  // Adds or removes layers on user click
  toggleLayer(event) : void{
    this.layers[event.source.id] = event.checked;
    this.binningService.setActiveLayers(this.layers);
  }

}
 