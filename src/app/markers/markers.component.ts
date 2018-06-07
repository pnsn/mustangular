import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { icon, divIcon, latLng, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import { Metric } from '../metric';
import { MakeMarkersService } from '../make-markers.service'
import { ActiveService} from '../active.service';
import { BinningService } from '../binning.service';
import { Bin } from '../bin';
import { Active } from '../active';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {
  metric: Metric;
  
  bins : Bin[];

  //need data count, min, max

  markers : any; //marker[];
  fitBounds: any;
  
  constructor(
    private makeMarkersService: MakeMarkersService,
    private activeService: ActiveService,
    private binningService: BinningService) { }

  ngOnInit() {
    this.activeService.getActiveMetric().subscribe(
      metric => { 
        this.metric = metric;
        this.bins = this.binningService.getBins();
        this.makeMarkers();
      }
    );
  }
  
  private toggleLayer(layer : string) {
    console.log(layer)
    return true;
  }
  
  private makeMarkers() : void { 
    if( this.metric && this.bins) {
      this.markers = this.makeMarkersService.getMarkers(this.metric, this.bins);
      if(this.makeMarkersService.getLatLons().length > 0) {
        this.fitBounds = latLngBounds(this.makeMarkersService.getLatLons())
      }
    
    }

  }
  //TODO: prevent recentering on new icons

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...' })
    ]
  };
}
