import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { divIcon, latLng, marker} from 'leaflet';
import { Station } from './station'

@Injectable()
export class MakeMarkersService {

  constructor() { }
 
  private latlons = [];
  getLatLons() : any {
    return this.latlons;
  }
  
  private buildIcon(station: Station, active:any) : any {
    let options = {
        icon: divIcon({
          className: 'icon-plain',
          html: "<div class='icon-test'></div>",
          iconAnchor: [5, 5], // Make sure icon is centered over coordinates
          popupAnchor:  [-1, -5]
        })
    }
  
    return options;
  }
  
  
  //This really needs to just reference a function
  private buildPopUp(station:Station, active:any) : string {
    let value = station.getValue(active);
    value = Math.round(value * 10 ) / 10;
    
    var string = "<div>";
    string += "Station: " + station.sta + "</div>" 
    + "<div> Displayed value: " + value 
    + "</div>" + "<div> Network: " + station.net + "</div>"
    + "<div> Channels (Average value): <ul id='channel-list'>";
    
    var channels = station.channels;
    for (let channel in channels ) {
      string += "<li>" + channels[channel].name + "</li>";
    }

    string += "</ul>"; 
    return string+"</div><button onclick='updateStation($event)'> Go to station data </button>";  
    // return "<div>Station: "+ station.name +"</div> <div> value: "+value+"</div><button (ngModelClick)='updateStation($event)'> Go to station data </button>";
  
  }
  
  //Makes leaflet markers using active channels and metrics
  getMarkers(metrics: Metric[], active: any): any{
    let markers = [];
    let latlons = [];
    for (let metric of metrics){
      if(metric.name == active.metric) {
        for(let s in metric.stations) {
          let station = metric.stations[s];
          let latlon = latLng(station.lat, station.lon);
          
          let options = this.buildIcon(station, active);
          
          markers.push(marker(latlon, options).bindPopup(this.buildPopUp(station, active)));
          latlons.push(latlon);
        }
      }
    }
    
    this.latlons = latlons;
    return markers;
  }
}
