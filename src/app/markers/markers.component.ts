// Generates the leaflet map and the markers on it
import { Component, OnInit, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
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
  
  constructor(
    private makeMarkersService: MakeMarkersService,
    private dataService: DataService,
    private binningService: BinningService,
    private elementRef : ElementRef
  ) {}
    
  activeMetric: Metric; // 

  overlays : any; // Active layers
  overlayMaster : any; // All available layers
  fitBounds: any; // Bounds to zoom map to
  layers : any = {}; // Layer statuses

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...' })
    ]
  }; // Leaflet map options
  
  ngOnInit() {
    // Wait for active metric
    this.dataService.getActiveMetric().subscribe(
      activeMetric => { 
        this.activeMetric = activeMetric;
        this.makeMarkers();
      }
    );
    
    // Add or remove layers from the map when the layers are toggled
    this.binningService.getActiveLayers().subscribe(
      layers => { 
        this.layers = layers;
        this.overlays = [];

        for ( let layer in this.layers) {
          if(this.layers[layer]) {
            let index = +layer.match(/\d+$/);
            this.overlays.push(this.overlayMaster[index]);
          }
        }
      }
    );
  }
  
  updateStation(event) : void {
    console.log(event)
  }
  
  // Make the markers for the map
  private makeMarkers() : void { 

    // Get the bins
    let bins = this.binningService.makeBins(this.activeMetric.display);
    
    if( this.activeMetric && bins) {
      // Make markers and recieve the overlays containing markers
      this.overlayMaster = this.makeMarkersService.makeMarkers(this.activeMetric, bins);
      
      // Update master bins with new bins.
      this.binningService.setBins(this.makeMarkersService.getBins());
      
      // Initiate layers statuses
      for(let bin of bins){
        if (bin.count > 0){
          this.layers[bin.layer] = true;
        }
      }
      
      // Update layer statuses
      this.binningService.setActiveLayers(this.layers);
      
      // Zoom map to fit the bounds
      if(this.makeMarkersService.getLatLons().length > 0) {
        this.fitBounds = latLngBounds(this.makeMarkersService.getLatLons());
        this.fitBounds.options = { padding: [400, 400] }; //TODO: make this zoom out a bit
      }
      
      //TODO: station popup
      // // add event listener to newly added a.merch-link element
      // this.elementRef.nativeElement.querySelector(".station-link")
      //   .addEventListener('click', (e) => {
      //     let id = e.target.getId;
      //     console.log(id)
      //   }));
    }

  }


}
