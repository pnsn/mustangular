import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { icon, divIcon, latLng, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import { Metric } from '../Metric';
import { MakeMarkersService } from '../make-markers.service'
import { ActiveService } from "../active.service";
import { CombineMetricsService} from '../combine-metrics.service';
import { BinningService } from '../binning.service';
import { Bin } from '../Bin';
import { Active } from '../active';
@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {
  metrics: Metric[];
  
  active : Active;
  
    bins= [
    {
      max:1,
      min: 0,
      color:"#000000",
      count:10,
      position:-1,
      name:"icon-group-0",
      width: 10 + "px"
    },
    { 
      max:2,
      min: 1,
      color:"#a6a6a6",
      count:14,
      position:0,
      name:"icon-group-0",
      width: 14 + "px"
    },
    { 
      max:4,
      min:2,
      color:"#ffffff",
      count:12,
      position:1,
      name:"icon-group-1",
      width: 12 + "px"
    },
  ]

  markers : any;
  fitBounds: any;
  constructor(
    private makeMarkersService: MakeMarkersService,
    private activeService: ActiveService,
    private combineMetricsService: CombineMetricsService,
    private binningService: BinningService) { }

  ngOnInit() {
    this.activeService.getActive.subscribe(
      active => { 
        this.active = active;
        this.makeMarkers();
      }
    );
    
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
        this.makeMarkers();
      }
    );
    
    //getBins
  }

  changeValue($event) : void {
    console.log(this.active.value);
    this.makeMarkers();
  }
  
  private makeMarkers() : void { 
    if( this.metrics && this.active) {
      this.markers = this.makeMarkersService.getMarkers(this.metrics, this.active);
      if(this.makeMarkersService.getLatLons().length > 0) {
        this.fitBounds = latLngBounds(this.makeMarkersService.getLatLons())
      }
    
    }

  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...' })
    ]
  };
}
