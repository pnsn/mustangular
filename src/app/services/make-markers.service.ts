import { Injectable, NgZone } from "@angular/core";
import { Metric } from "@models/metric";
import { divIcon, latLng, Marker, layerGroup } from "leaflet";
import { Station } from "@models/station";
import { Bin } from "@models/bin";
import { Subject, Observable } from "rxjs";
import { StationsService } from "@services/stations.service";
import { Channel } from "@models/channel";
import { ColocatedType, DisplayValue } from "app/types";

/** Takes a metric and the bins and creates marker layers for the map */
@Injectable()
export class MakeMarkersService {
  constructor(private zone: NgZone, private stationsService: StationsService) {}

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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    for (const bin of this.bins) {
      if (!markerGroups[bin.layer]) {
        markerGroups[bin.layer] = [];
      }
    }

    // Go through each station and create the icon
    for (const [code, station] of metric._stations) {
      if (!station.lat || !station.lon) {
        const info = this.stationsService.getStationData(code);
        if (info) {
          station.lat = info.lat;
          station.lon = info.lon;
          station.name = info.name;
        }
      }

      if (station.lat && station.lon) {
        const latlon = latLng(station.lat, station.lon);

        const options = this.buildIcon(station);
        const m = new Marker(latlon, { icon: options.icon });

        m.on("click", function () {
          self.zone.run(() => {
            self.activeStation.next(station);
          });
        });

        m.bindTooltip(self.buildPopup(station, metric.display.colocatedType));

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
      if (markerGroups[group]) {
        this.overlays.push(layerGroup(markerGroups[group]));
      }
    }

    return this.overlays;
  }

  // Build an icon for a station
  private buildIcon(station: Station): any {
    const value = station.displayValue;
    const activeBin: Bin = this.getBin(value);

    // Sort station into a bin
    if (activeBin) {
      activeBin.count++;
      return {
        icon: divIcon({
          className: "icon",
          html:
            "<div class='icon-color " +
            activeBin.layer +
            "' style='background-color:" +
            activeBin.color +
            "'></div>",
          iconAnchor: [5, 5], // Make sure icon is centered over coordinates
          popupAnchor: [1, -2],
        }),
        binIndex: activeBin.layer,
      };
    }
  }
  // Bins: user sets binning max and min and n number of bins between them
  // [0] - all values < than set binning min
  // [1] to [n-2] - bin min < values < bin max
  // [n-1] - binmin < value <= bin max (this one is inclusive)
  // [n] - all values > than set binning max
  // Returns the bin the given value falls into
  private getBin(value: number): Bin {
    let activeBin: Bin;

    let binIndex = 0;
    while (!activeBin && binIndex < this.bins.length) {
      const bin = this.bins[binIndex];
      activeBin = bin.inBin(value, binIndex, this.bins.length)
        ? bin
        : activeBin;
      binIndex++;
    }
    return activeBin ? activeBin : this.bins[this.bins.length - 1];
  }

  // Builds the station information popup
  private buildPopup(station: Station, colocatedType: ColocatedType): string {
    let value = station.displayValue;
    value = Math.round(value * 10) / 10;

    let string = `<h3>${station.code}</h3><span> Click to view data</span><div> Value: (`;

    if (colocatedType === "channel" && station.displayChannel) {
      string += station.displayChannel;
    } else {
      string += "aggregate";
    }
    string += `) ${value} <div> Channels: <ul id='channel-list'>`;

    for (const [code, channel] of station._channels) {
      const channelValue = channel.value;
      const bin = this.getBin(channelValue);

      string += '<li style="color:' + bin.color;

      if (bin.color === "#ffffff" || bin.color === "white") {
        string += '; background-color: gray;"';
      } else {
        string += ';"';
      }

      if (colocatedType === "channel" && code === station.displayChannel) {
        string += " class='active channel'";
      }
      string += `>${code} (${Math.round(channelValue * 100) / 100})</li>`;
    }

    string += "</ul>";
    return string;
  }
}
