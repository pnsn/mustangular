// Describes a Channel object
import { DisplayValue } from "app/types";
import { Measurement } from "./measurement";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
export class Channel {
  constructor(code: string, public loc = "--", public cha = "") {
    this.measurements = new Array<Measurement>();
    this.name = code;
  }
  readonly name: string;
  // raw measurements for this channel
  public measurements: Measurement[];
  private _value: number;

  get value(): number {
    return this._value;
  }

  // maps measurements to their value, uses absolute value if absValue === true
  mapMeasurements(absValue: boolean): Observable<number[]> {
    let values = this.measurements
      .map((measurement) => {
        return absValue ? Math.abs(measurement.value) : measurement.value;
      })
      .sort((a, b) => a - b);

    if (!values) values = [];
    return of(values);
  }

  // caclulates value for this channel using the display value,
  // returns observable that resolves to the value
  value$(displayValue: DisplayValue, absValue: boolean): Observable<number> {
    return this.mapMeasurements(absValue).pipe(
      map((values: number[]): number => {
        switch (displayValue) {
          case "Minimum": {
            return this.getMin(values);
          }
          case "Maximum": {
            return this.getMax(values);
          }
          case "Average": {
            return this.getAverage(values);
          }
          case "Median": {
            return this.getMedian(values);
          }
          case "5th_Percentile": {
            return this.getPercentile(values, 5);
          }
          case "95th_Percentile": {
            return this.getPercentile(values, 95);
          }
          default: {
            return null;
          }
        }
      }),
      tap((value: number) => {
        this._value = value;
      })
    );
  }

  // Calculates the median for the channel
  private getMedian(values: number[]): number {
    const mid = values.length / 2 - 0.5;
    let median: number;

    if (mid % 1 === 0) {
      median = values[mid];
    } else {
      median = (values[mid - 0.5] + values[mid - 0.5]) / 2;
    }
    return median;
  }

  // Calculates the average value for the channel
  private getAverage(values: number[]): number {
    let sum = 0;
    for (const value of values) {
      sum += value;
    }
    const average = sum / values.length;

    return average;
  }

  // Returns requested percentile, probably
  private getPercentile(values: number[], percentile: number): number {
    const index = Math.ceil((percentile / 100) * values.length);
    return index === values.length ? values[index - 1] : values[index];
  }

  // Returns the channel's maximum value
  private getMax(values: number[]): number {
    return values[values.length - 1];
  }

  // Returns the channel's minimum value
  private getMin(values: number[]): number {
    return values[0];
  }
}
