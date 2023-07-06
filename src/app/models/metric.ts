// Describes a Metric object
import { MetricType } from "app/types";
import { Display } from "./display";
import { Station } from "./station";
import { Observable, Observer, combineLatest } from "rxjs";
import { map, tap } from "rxjs/operators";
export class Metric {
  constructor(
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string,
    public tables?: any
  ) {
    this.display = new Display();
    this.stations = {};
    this.setMetricType();
    this._stations = new Map<string, Station>();
  }

  display: Display; // Metric's display settings
  stations: Record<string, Station>; // Metric's stations

  _stations: Map<string, Station>;
  private values: Array<number>; // Metric's display values

  // adds or creates channel and returns channel
  getOrCreateStation(
    net: string,
    sta: string,
    stationCode: string,
    qual: string
  ): Station {
    if (!this._stations.has(stationCode)) {
      this._stations.set(stationCode, new Station(net, sta, stationCode, qual));
    }

    return this._stations.get(stationCode);
  }

  data$(recalculateBins: boolean): Observable<number[]> {
    const stations = [...this._stations.values()].map((station) =>
      station.value$(
        this.display.colocatedType,
        this.display.displayValue,
        this.display.aggregateValue,
        this.display.channels.available,
        this.display.absValue
      )
    );
    return combineLatest(stations).pipe(
      map((values: number[]): number[] => {
        return values.sort(function (a, b) {
          return a - b;
        });
      }),
      tap((values: number[]) => {
        if (values.length > 0) {
          this.display.data.max = values[values.length - 1];
          this.display.data.min = values[0];
        }
        this.values = values;
        this.getActiveChannels();
        if (recalculateBins) {
          this.calculateBinning();
        }
      })
    );
  }

  // Returns metric's values
  getValues(): Array<number> {
    return this.values;
  }

  // Return all of metric's channels
  getChannels(): Array<string> {
    const channelCodes = new Set<string>();

    for (const [_code, station] of this._stations) {
      if (station._channels.size > 1) {
        this.display.hasCoLocatedChannels = true;
      }
      for (const code of station._channels.keys()) {
        channelCodes.add(code);
      }
    }
    return Array.from(channelCodes);
  }

  // Return the channels that are actually being used
  private getActiveChannels(): void {
    const availableChannels = this.display.channels.available.slice();
    const activeChannels = new Set<string>();
    this._stations.forEach((station) => {
      const c = station.displayChannel;
      activeChannels.add(c);
    });
    this.display.channels.active = availableChannels.filter((channel) =>
      activeChannels.has(channel)
    );
  }

  private setMetricType(): void {
    let dType: MetricType;
    if (
      this.description?.toLowerCase().search(/percent/i) > -1 ||
      this.unit?.toLowerCase().search(/percent/i) > -1
    ) {
      dType = "percent";
    } else if (
      this.description.toLowerCase().search(/boolean/i) > -1 ||
      this.unit.toLowerCase().search(/boolean/i) > -1
    ) {
      dType = "boolean";
    } else if (
      this.description.toLowerCase().search(/polarity/i) > -1 ||
      this.unit.toLowerCase().search(/polarity/i) > -1
    ) {
      dType = "polarity";
    }
    this.display.metricType = dType;
  }

  calculateBinning(): void {
    const values = this.values;
    const length = values.length;
    let minIndex: number;
    let maxIndex: number;
    let max, min, count: number;

    // Find max and min values - default to %iles unless specified
    switch (this.display.metricType) {
      case "percent":
        min = 0;
        max = 100;
        count = 5;
        break;
      case "boolean":
        min = 0;
        max = 1;
        count = 2;
        break;
      case "polarity":
        min = -1;
        max = 1;
        count = 2;
        break;
      default:
        minIndex = Math.ceil(0.05 * length) - 1;
        maxIndex = Math.floor(0.95 * length);
        min = length > 0 && values[minIndex] ? +values[minIndex].toFixed(2) : 0;
        max = length > 0 && values[maxIndex] ? +values[maxIndex].toFixed(2) : 1;

        if (length === 0 || minIndex === maxIndex) {
          // small dataset
          count = 1;
        } else if (values[maxIndex] - values[minIndex] < 2) {
          // range
          count = 2;
        } else {
          count = 3;
        }
        break;
    }
    this.display.binning = {
      max: max,
      min: min,
      count: count,
    };
    console.log(this.display.binning);
  }
}
