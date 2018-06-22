import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { icon, divIcon, latLng, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import { Metric } from '../metric';
import { MakeMarkersService } from '../make-markers.service'
import { DataService} from '../data.service';
import { BinningService } from '../binning.service';
import { Bin } from '../bin';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {
  metric: Metric;
  //need data count, min, max

  markers : any; //marker[];
  fitBounds: any;
  constructor(
    private makeMarkersService: MakeMarkersService,
    private dataService: DataService,
    private binningService: BinningService) { }

  ngOnInit() {
    this.dataService.getActiveMetric().subscribe(
      metric => { 
        this.metric = metric;
        this.makeMarkers();
      }
    );
  }
  
  private toggleLayer(layer : string) {
    console.log(layer)
    return true;
  }
  
  private makeMarkers() : void { 
    let bins = this.binningService.makeBins(this.metric.display);
    if( this.metric && bins) {
      this.markers = this.makeMarkersService.getMarkers(this.metric, bins);
      
      this.binningService.setBins(this.makeMarkersService.getBins());
      
      if(this.makeMarkersService.getLatLons().length > 0) {
        this.fitBounds = latLngBounds(this.makeMarkersService.getLatLons());
        this.fitBounds.options = { padding: [400, 400] }; //TODO: make this zoom out a bit
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
