import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { icon, divIcon, latLng, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import { Metric } from '../Metric';
import { MakeMarkersService } from '../make-markers.service'
import { ActiveService } from "../active.service";
import { CombineMetricsService} from '../combine-metrics.service';
import { BinningService } from '../binning.service';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit {
  metrics: Metric[];
  
  active = {
    "metricIndex" : 0,
    "channels" : [],
    "value" : ""
  };

  markers : any;
  fitBounds: any;
  constructor(
    private makeMarkersService: MakeMarkersService,
    private activeService: ActiveService,
    private combineMetricsService: CombineMetricsService,
    private binningService: BinningService) { }

  ngOnInit() {
    this.activeService.getActiveMetricIndex.subscribe(
      activeMetricIndex => { 
        this.active.metricIndex = activeMetricIndex;
        this.makeMarkers();
      }
    );
    
    this.activeService.getActiveValue.subscribe(
      activeValue => { 
        this.active.value = activeValue;
        this.makeMarkers();
      }
    );
    
    this.combineMetricsService.getMetrics.subscribe(
      metrics => { 
        this.metrics = metrics;
        this.makeMarkers();
      }
    );
    
    this.activeService.getActiveChannels.subscribe(
      activeChannels => { 
        this.active.channels = activeChannels;
        this.makeMarkers();
      }
    )
  }
  
  updateStation($event) : void {
    console.log($event)
  }
  
  changeValue($event) : void {
    console.log(this.active.value)
   this.makeMarkers();
  }
  
  private makeMarkers() : void { 
    if( this.metrics) {
      console.log("makeMarkers")
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
