import { Injectable } from "@angular/core";
import { Metric } from "@models/metric";
import { Subject, Observable } from "rxjs";
import { Display } from "@models/display";

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

  getActiveMetric$(): Observable<Metric> {
    return this.activeMetric.asObservable();
  }

  // return metrics
  getMetrics(): Metric[] {
    return this.metrics.slice();
  }

  // changes active metric
  setActiveMetric(metric: Metric): void {
    this.activeMetric.next(metric);
  }

  // calculates values for metrics and sends out
  recalculateActiveMetric(activeMetric: Metric): void {
    activeMetric.data$(false).subscribe(() => {
      this.setActiveMetric(activeMetric);
    });
  }

  // only happens once
  setMetrics(metrics: Metric[]): void {
    this.metrics = metrics;
    let activeMetric = null;
    for (const metric of this.metrics) {
      const updatedMetric = this.setDefaultDisplay(metric);
      const recalculateBins =
        metric.display.binning.max === null ||
        metric.display.binning.min === null;
      updatedMetric.data$(recalculateBins).subscribe({
        next: () => {
          if (activeMetric === null && updatedMetric.display.data.count > 0) {
            activeMetric = updatedMetric;
            this.setActiveMetric(activeMetric);
          }
        },
      });
    }
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
    display.absValue = this.defaultDisplay.absValue;
    display.invert = this.defaultDisplay.invert;

    display.channels.available = metric.getChannels();

    if (
      this.defaultDisplay.binning &&
      this.defaultDisplay.binning.max !== null &&
      this.defaultDisplay.binning.min !== null &&
      this.defaultDisplay.binning.count !== null
    ) {
      display.binning = this.defaultDisplay.binning;
    }
    return metric;
  }
}
