// Takes a metric and the bins and creates marker layers for the map

import { Injectable } from '@angular/core';
import { Metric } from './metric';
import { divIcon, latLng, marker, layerGroup} from 'leaflet';
import { Station } from './station'
import { Bin } from './bin';

@Injectable()
export class MakeMarkersService {

  constructor() { }
 
  private latlons = []; // Array of coordinates
  private bins : Bin[]; // local copy of bins
  private overlays : Array<any>;
  // Returns array of coordinates
  getLatLons() : any {
    return this.latlons;
  }
  
  // Returns bins
  getBins() : Bin[] {
    return this.bins;
  }

  // Makes leaflet markers using active channels and metrics and returns overlays
  makeMarkers(metric: Metric, bins : Bin[]): any{
    let markerGroups = {};
    let latlons = [];
    this.overlays = [];
    this.bins = bins;

    
    for (let bin of this.bins){
      if(!markerGroups[bin.layer]) {
        markerGroups[bin.layer] = [];
      }
    }
    
    // Go through each station and create the icon
    for(let s in metric.stations) {
      let station = metric.stations[s];
      let latlon = latLng(station.lat, station.lon);
      
      let options = this.buildIcon(station, metric.display.displayValue);
      markerGroups[options.binIndex].push(marker(latlon, {icon: options.icon}).bindPopup(this.buildPopup(station, metric.display.displayValue)));
      latlons.push(latlon);
    }
    
    this.latlons = latlons;
    
    for (let bin of this.bins){
      bin.setWidth(metric.display.data.count);
    }

    for(let group in markerGroups){
      this.overlays.push(layerGroup(markerGroups[group]));
    }
    console.log(markerGroups)
    return this.overlays;
  }
  
  // Build an icon for a station
  private buildIcon(station: Station, displayValue:string) : any {
    let value = station.displayValue;
    let color : string;
    let activeBin : Bin;
    
    // Sort station into a bin
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
        };
      }

    }

  }
  
  // Builds the station information popup
  // TODO: link to station
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
    return string+"</div><button class='station-link' id='"+station.net+"."+station.sta+"' click='alert('station should show')'> Go to station data </button>";  
  }
}
