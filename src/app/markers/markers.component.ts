import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { icon, divIcon, latLng, latLngBounds, marker, polyline, tileLayer } from 'leaflet';
import { Metric } from '../Metric';
import { MakeMarkersService } from '../make-markers.service'
import { ActiveService } from "../active.service";

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements OnInit, OnChanges {
  @Input() metrics: Metric[];
  
  active = {
    "metric" : "",
    "channels" : []
  };
  
  markers : any;
  fitBounds: any;
  constructor(private makeMarkersService: MakeMarkersService, private activeService: ActiveService) { }

  ngOnInit() {
    this.activeService.getActive.subscribe(
      activeMetric => { 
        this.active.metric = activeMetric;
        console.log("should make new metircs")
        this.makeMarkers();
      }
      
    );
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log("active metric, markers", this.active.metric)
    this.makeMarkers();
  }
  
  private makeMarkers() : void { 
    if( this.metrics && this.active.metric) {
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
