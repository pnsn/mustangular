// Describes a Display object

import { Binning, Channels, Data } from "@interfaces/binning.interface";
import { DisplayParams } from "@interfaces/params.interface";
import {
  AggregateValue,
  ColocatedType,
  DisplayValue,
  MetricType,
} from "app/types";

export class Display {
  // Data's max, min, and number of data points
  data: Data;
  // High and low color selections
  coloring: string;
  // Upper and lower bounds for bins and number of bins
  binning: Binning;
  // Currently selected value to display for channels
  displayValue: DisplayValue;
  // Currently selected value to display for stations
  aggregateValue: AggregateValue;
  // Type of display: channels or aggregate
  colocatedType: ColocatedType;
  channels: Channels;
  invert: boolean;
  metricType?: MetricType; // Binary/Percent
  hasCoLocatedChannels: boolean;
  constructor() {
    this.data = {
      min: null,
      max: null,
      count: 0,
    };

    this.binning = {
      min: null,
      max: null,
      count: 0,
    };

    // Channels to display
    this.channels = {
      active: <string[]>null,
      available: <string[]>null,
    };
  }

  // Ensures there are values for binning
  private fixBins(): void {
    this.binning.min = this.binning.min === null ? 0 : this.binning.min;
    this.binning.max = this.binning.max === null ? 0 : this.binning.max;
    this.binning.count =
      this.binning.count === null || this.binning.count <= 0
        ? 1
        : this.binning.count;
  }

  // Returns a URL friendly string of the Display
  toString(): string {
    this.fixBins();
    const string =
      "&coloring=" +
      this.coloring +
      "&invert=" +
      this.invert +
      "&bincount=" +
      this.binning.count +
      "&binmin=" +
      this.binning.min +
      "&binmax=" +
      this.binning.max +
      "&displayValue=" +
      this.displayValue +
      "&colocatedType=" +
      this.colocatedType +
      "&aggregateValue=" +
      this.aggregateValue +
      "&channels=" +
      this.channels.active.toString();
    return string;
  }

  toParams(): DisplayParams {
    this.fixBins();
    return {
      coloring: this.coloring,
      invert: this.invert,
      bincount: this.binning.count,
      binmin: this.binning.min,
      binmax: this.binning.max,
      displayValue: this.displayValue,
      colocatedType: this.colocatedType,
      aggregateValue: this.aggregateValue,
      channels: this.channels.active.toString(),
    };
  }

  resetBins(): void {
    // Upper and lower bounds for bins and number of bins
    this.binning = {
      min: null,
      max: null,
      count: 0,
    };
  }
}

// {
//   data : {
//     max : number
//     min : number
//     count : number
//   },
//   coloring : {
//     low : color,
//     high : color
//   },
//   binning : {
//     min : number,
//     max : number,
//     count : number
//   },
//   displayValue : string,
//   aggregateValue: string,
//   channels : {
//     active : string array,
//     available : string array
//   }
// }
