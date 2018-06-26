import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { divIcon, latLng, marker, layerGroup} from 'leaflet';
import { Station } from './station'
import { Bin } from './bin';
@Injectable()
export class MakeMarkersService {

  constructor() { }
 
  private latlons = [];
  getLatLons() : any {
    return this.latlons;
  }
  
  getBins() : Bin[] {
    console.log(this.bins, "hi")
    return this.bins;
  }
  
  private bins : Bin[];
  
  //Makes leaflet markers using active channels and metrics
  getMarkers(metric: Metric, bins : Bin[]): any{
    let markerGroups = {};
    let latlons = [];
    this.bins = bins;
  
    
    for(let s in metric.stations) {
      let station = metric.stations[s];
      let latlon = latLng(station.lat, station.lon);
      
      let options = this.buildIcon(station, metric.display.displayValue);
      
      if(!markerGroups[options.binIndex]) {
        markerGroups[options.binIndex] = [];
      }
      markerGroups[options.binIndex].push(marker(latlon, {icon: options.icon}).bindPopup(this.buildPopup(station, metric.display.displayValue)));
      // markers.push();
      
      
      latlons.push(latlon);
    }
    this.latlons = latlons;
    
    for (let bin of this.bins){
      bin.setWidth(metric.display.data.count);
    }
    
    let overlays = [];
    for(let group in markerGroups){
      overlays.push(layerGroup(markerGroups[group]));
    }
    return overlays;
  }
  
  private buildIcon(station: Station, displayValue:string) : any {
    let value = station.displayValue;
    let color : string;
    let activeBin : Bin;
    for (let bin of this.bins){
      if (value === null) {
        activeBin = this.bins[this.bins.length - 1];
      } else if (value >= bin.min && value < bin.max || bin.position == 1 && value == bin.max){
        activeBin = bin;
      } 
      
      if(activeBin) {
        activeBin.count++;
        return {
              icon: divIcon({
                'className': 'icon',
                'html': "<div class='icon-color "+activeBin.layer+"' style='background-color:" + activeBin.color + "'></div>",
                'iconAnchor': [5, 5], // Make sure icon is centered over coordinates
                'popupAnchor':  [1 , -2]
              }),
              binIndex: activeBin.layer
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
    + "<div> Channels: <ul id='channel-list'>";
    for (let channel in station.channels ) {
      string += "<li"
      if (channel == station.displayChannel) {
        string += " class='active channel'";
      
      }
      string += ">" + channel + "</li>";
    }

    string += "</ul>"; 
    return string+"</div><button onclick='updateStation($event)'> Go to station data </button>";  
    // return "<div>Station: "+ station.name +"</div> <div> value: "+value+"</div><button (ngModelClick)='updateStation($event)'> Go to station data </button>";
  
  }
  

}
