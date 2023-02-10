import { Injectable } from "@angular/core";
import { Metric } from "@models/metric";
import { Subject, Observable } from "rxjs";
import { Display } from "@models/display";
import { MetricType } from "app/types";

/** Handles metrics and calculating displays */
@Injectable()
export class DataService {
  private defaultDisplay: Display;
  private metrics: Metric[];
  private activeMetric = new Subject<Metric>();
  private metricNames: string[] = [];

  set display(display: Display) {
    this.defaultDisplay = display;
  }

  get display(): Display {
    return this.defaultDisplay;
  }

  getActiveMetric(): Observable<Metric> {
    return this.activeMetric.asObservable();
  }

  // Changes the active metric and propagates it
  private setActiveMetric(activeMetricName: string): void {
    for (const metric of this.metrics) {
      if (metric.name === activeMetricName) {
        metric.updateValues();
        this.activeMetric.next(metric);
      }
    }
  }

  // return metrics
  getMetrics(): Metric[] {
    return this.metrics.slice();
  }

  updateMetrics(metrics: Metric[], activeMetricName: string): void {
    this.metrics = metrics;
    this.setActiveMetric(activeMetricName);
  }

  // only happens once
  setMetrics(metrics: Metric[]): void {
    this.metrics = metrics;
    let defaultMetric = null;
    for (const metric of this.metrics) {
      const updatedMetric = this.setDefaultDisplay(metric);
      if (defaultMetric === null && updatedMetric.display.data.count > 0) {
        defaultMetric = updatedMetric;
      }
    }
    if (defaultMetric) {
      this.activeMetric.next(defaultMetric);
    }
  }

  // Calculates 5th and 95th percentile of data
  // gets weird when there's only a few values
  private calculateBinning(values: number[], type?: MetricType): any {
    const length = values.length;
    let minIndex: number;
    let maxIndex: number;
    let max, min, count: number;

    // Find max and min values - default to %iles unless specified
    switch (type) {
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

    return {
      max: max,
      min: min,
      count: count,
    };
  }

  private sortChannels(channels: Array<string>): Array<string> {
    if (channels.length > 0) {
      const displayChannels = [];
      for (const channel of channels) {
        if (displayChannels.indexOf(channel) === -1) {
          displayChannels.push(channel);
        }
      }
      return displayChannels;
    } else {
      return channels;
    }
  }

  // recalculate values for metric after change
  recalculateMetrics(metrics: Metric[]): void {
    metrics.forEach((metric) => {
      metric.updateValues();
      const values = metric.getValues();
      metric.display.binning = this.calculateBinning(
        values,
        metric.display.metricType
      );
    });
  }

  // Apply default value, parameter values or calculate new ones.
  private setDefaultDisplay(metric: Metric): Metric {
    const display = metric.display;

    if (this.metricNames.indexOf(metric.name) < 0) {
      this.metricNames.push(metric.name);
    }

    display.displayValue = this.defaultDisplay.displayValue ?? "Average";
    display.colocatedType = this.defaultDisplay.colocatedType ?? "channel";
    display.aggregateValue = this.defaultDisplay.aggregateValue ?? "Minimum";
    display.coloring = this.defaultDisplay.coloring ?? "red_to_green";

    display.invert = this.defaultDisplay.invert
      ? this.defaultDisplay.invert
      : false;

    display.channels.available = this.sortChannels(metric.getChannels());

    metric.updateValues();
    const values = metric.getValues();

    if (
      this.defaultDisplay.binning &&
      this.defaultDisplay.binning.max !== null &&
      this.defaultDisplay.binning.min !== null &&
      this.defaultDisplay.binning.count !== null
    ) {
      display.binning = this.defaultDisplay.binning;
    } else {
      display.binning = this.calculateBinning(values, display.metricType);
    }
    return metric;
  }
}
