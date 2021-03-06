// Takes a metric and the bins and creates marker layers for the map

import { Injectable, NgZone } from '@angular/core';
import { Metric } from '../map/metric';
import { divIcon, latLng, Marker, layerGroup} from 'leaflet';
import { Station } from '../map/station';
import { Bin } from '../map/bin';
import { Subject ,  Observable } from 'rxjs';
import { StationsService } from './stations.service';

@Injectable()
export class MakeMarkersService {

  constructor(
    private zone: NgZone,
    private stationsService: StationsService
    ) { }

  private latlons = []; // Array of coordinates
  private bins: Bin[]; // local copy of bins
  private overlays: Array<any>;

  private activeStation = new Subject<Station>();

  getActiveStation(): Observable<Station> {
    return this.activeStation.asObservable();
  }

  // Returns array of coordinates
  getLatLons(): any {
    return this.latlons;
  }

  // Returns bins
  getBins(): Bin[] {
    return this.bins;
  }

  // Makes leaflet markers using active channels and metrics and returns overlays
  makeMarkers(metric: Metric, bins: Bin[]): any {
    const markerGroups = {};
    const latlons = [];
    this.overlays = [];
    this.bins = bins;
    const self = this;

    for (const bin of this.bins) {
      if (!markerGroups[bin.layer]) {
        markerGroups[bin.layer] = [];
      }
    }

    // Go through each station and create the icon
    for (const s in metric.stations) {
      const station = metric.stations[s];
      if (!station.lat || !station.lon) {
        const info = this.stationsService.getMissingStationInformation(station.code);
        if (info) {
          station.lat = info.lat;
          station.lon = info.lon;
          station.name = info.name;
        }
      }

      if(station.lat && station.lon) {
        const latlon = latLng(station.lat, station.lon);

        const options = this.buildIcon(station, metric.display.displayValue);
        const m = new Marker(latlon, {icon: options.icon});
  
        m.on('click', function() {
          self.zone.run( () => {
            self.activeStation.next(station);
          });
        });
  
        m.bindTooltip(self.buildPopup(station, metric.display.displayValue));
     
        markerGroups[options.binIndex].push(m);
        latlons.push(latlon);
      } else {
        // Station does not have data in fdsnws and must be skipped
        console.log("no station data for: " + station.code);
      }
    } 

    this.latlons = latlons;

    for (const bin of this.bins) {
      bin.setWidth(metric.display.data.count);
    }

    for (const group in markerGroups) {
      this.overlays.push(layerGroup(markerGroups[group]));
    }

    return this.overlays;
  }

  // Build an icon for a station
  private buildIcon(station: Station, displayValue: string): any {
    const value = station.displayValue;
    let activeBin: Bin;

    // Sort station into a bin
    for (const binIndex in this.bins) {
      const bin = this.bins[+binIndex];
      if (value === null) {
        activeBin = this.bins[this.bins.length - 1]; // last bin for no data
      } else if (+binIndex === this.bins.length - 2 && value > bin.min ||
                +binIndex === this.bins.length - 3 && value <= bin.max ||
                value >= bin.min && value < bin.max ) {// inclusive on upper end
        activeBin = bin;
      }

      // make inclusive on upper end - so the bin 3 from the end?
      // min bin
      // other bins
      // almost last
      // max bin
      // no data

      if (activeBin) {
        activeBin.count++;
        return {
              icon: divIcon({
                'className': 'icon',
                'html': '<div class=\'icon-color ' + activeBin.layer + '\' style=\'background-color:' + activeBin.color + '\'></div>',
                'iconAnchor': [5, 5], // Make sure icon is centered over coordinates
                'popupAnchor':  [1 , -2]
              }),
              binIndex: activeBin.layer
        };
      }

    }

  }

  // Builds the station information popup
  private buildPopup(station: Station, displayValue: string): string {
    let value = station.displayValue;
    value = Math.round(value * 10 ) / 10;

    let string = '<h3>' + station.net + '.' + station.sta + '</h3>' +
                '<span> Click to view data</span>' +
                '<div> Value: (' + station.displayChannel + ') ' + value +
                '<div> Channels: <ul id=\'channel-list\'>';

    for (const c in station.channels ) {
      const channel = station.channels[c];

      string += '<li';

      if (channel.name === station.displayChannel) {
        string += ' class=\'active channel\'';
      }
      string += '>' + channel.name + '</li>';
    }

    string += '</ul>';
    return string;
  }
}
