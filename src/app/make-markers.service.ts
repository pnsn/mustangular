import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { divIcon, latLng, marker} from 'leaflet';
import { Station } from './station'
import { Bin } from './Bin';
@Injectable()
export class MakeMarkersService {

  constructor() { }
 
  private latlons = [];
  getLatLons() : any {
    return this.latlons;
  }
  
  private bins : Bin[];
  
  //Makes leaflet markers using active channels and metrics
  getMarkers(metric: Metric, bins : Bin[]): any{
    let markers = [];
    let latlons = [];
    this.bins = bins;
    for(let s in metric.stations) {
      let station = metric.stations[s];
      let latlon = latLng(station.lat, station.lon);
      
      let options = this.buildIcon(station, metric.displayValue);
      
      markers.push(marker(latlon, options).bindPopup(this.buildPopup(station, metric.displayValue)));
      latlons.push(latlon);
    }
    console.log(this.bins)
    this.latlons = latlons;
    return markers;
  }
  
  private buildIcon(station: Station, displayValue:string) : any {
    let value = station.displayValue;
    let color : string;
    let activeBin : Bin;
    for (let bin of this.bins){
      //do something when max/min is NUll
      if (value === null) {
        activeBin = this.bins[this.bins.length - 1];
      } else if (value >= bin.min && value < bin.max || bin.min === null && value < bin.max || value >= bin.min && bin.max === null){
        activeBin = bin;
      } 
      
      if(activeBin) {
        activeBin.count++;
        return {
              icon: divIcon({
                'className': 'icon',
                'html': "<div class='icon-color' style='background-color:" + activeBin.color + "'></div>",
                'iconAnchor': [5, 5], // Make sure icon is centered over coordinates
                'popupAnchor':  [1 , -2]
              })
            }
      }

    }

  }
  
  
  //This really needs to just reference a function
  private buildPopup(station:Station, displayValue:string) : string {
    let value = station.displayValue;
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
  

}
