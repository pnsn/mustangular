import { Component, OnInit } from '@angular/core';
import { BinningService } from '../binning.service';
import { Bin } from '../bin';
@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  constructor(private binningService : BinningService) { }
  bins : Bin[];
  ngOnInit() {
    this.binningService.getBins().subscribe(
      bins => { 
        this.bins = bins;
      }
    );
    this.binningService.getActiveLayers().subscribe(
      layers => { 
        this.layers = layers;
      }
    );
  }  
  layers :any = {};

  toggleLayer(event) : void{
    this.layers[event.source.id] = event.checked;
    this.binningService.setActiveLayers(this.layers);
  }

}
 