// Describes a Metric object
import { MetricType } from "app/types";
import { Display } from "./display";
import { Station } from "./station";
import { Observable, combineLatest, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
export class Metric {
  constructor(
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string,
    public tables?: any
  ) {
    this.display = new Display();
    this.setMetricType();
    this.stations = new Map<string, Station>();
  }

  display: Display; // Metric's display settings

  stations: Map<string, Station>;
  private values: Array<number>; // Metric's display values

  // adds or creates channel and returns channel
  getOrCreateStation(
    net: string,
    sta: string,
    stationCode: string,
    qual: string
  ): Station {
    if (!this.stations.has(stationCode)) {
      this.stations.set(stationCode, new Station(net, sta, stationCode, qual));
    }

    return this.stations.get(stationCode);
  }

  // Gets all station values for the metric and finds the range
  // of the data. If recalculateBins = true, the bins will
  // be recalculated using the new values
  // Returns observable that resolves to the sort values for the
  // metric
  data$(recalculateBins: boolean): Observable<number[]> {
    const stations = [...this.stations.values()].map((station) => {
      return station.value$(
        this.display.colocatedType,
        this.display.displayValue,
        this.display.aggregateValue,
        this.display.channels.available,
        this.display.absValue
      );
    });
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
      }),
      catchError((err) => {
        console.log(err);
        return of([]);
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

    for (const [_code, station] of this.stations) {
      if (station.channels.size > 1) {
        this.display.hasCoLocatedChannels = true;
      }
      for (const code of station.channels.keys()) {
        channelCodes.add(code);
      }
    }
    return Array.from(channelCodes);
  }

  // Return the channels that are actually being used
  private getActiveChannels(): void {
    const availableChannels = this.display.channels.available.slice();
    const activeChannels = new Set<string>();
    this.stations.forEach((station) => {
      const c = station.displayChannel;
      activeChannels.add(c);
    });
    this.display.channels.active = availableChannels.filter((channel) =>
      activeChannels.has(channel)
    );
  }

  // Uses the metric's description or unit to figure out if the metric
  // is a percent, boolean, or polarity metric and stores that as the metricType
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

  // Finds the default binning for the metric using the metricType
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
        // 5th and 95th percentile for all other metrics
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
  }
}
