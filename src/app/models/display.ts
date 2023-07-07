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
  //use absolute value of metrics for calculation?
  absValue?: boolean;
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
    const params = this.toParams();
    let string = "";
    for (const key in params) {
      if (params[key]) {
        string += `&${key}=${params[key]}`;
      }
    }
    return string;
  }

  // returns display formatted for url params
  toParams(): DisplayParams {
    this.fixBins();
    const params: DisplayParams = {};

    if (this.coloring) params["coloring"] = this.coloring;
    if (this.binning) {
      if (this.binning.min !== null) params["binmin"] = this.binning.min;
      if (this.binning.max !== null) params["binmax"] = this.binning.max;
      if (this.binning.count !== null) params["bincount"] = this.binning.count;
    }
    if (this.displayValue) params["displayValue"] = this.displayValue;
    if (this.colocatedType) params["colocatedType"] = this.colocatedType;
    if (this.aggregateValue) params["aggregateValue"] = this.aggregateValue;
    if (this.channels && this.channels.active)
      params["channels"] = this.channels.active.toString();

    params["absValue"] = this.absValue === true;
    params["invert"] = this.invert === true;
    return params;
  }

  // resets bins to the default
  resetBins(): void {
    // Upper and lower bounds for bins and number of bins
    this.binning = {
      min: null,
      max: null,
      count: 0,
    };
  }
}
