// Get metric information from MUSTANG

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Metric } from "@models/metric";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface IrisMetric {
  title: string;
  name: string;
  description: string;
  tables: any[];
  version: 1;
}
export interface MetricResponse {
  metrics?: IrisMetric[];
}
@Injectable()
export class MetricsService {
  constructor(private http: HttpClient) {}

  // Returns metrics and filters out errored metrics
  private mapMetrics(response: MetricResponse): Metric[] {
    const metrics: Metric[] = [];
    response?.metrics.forEach((m) => {
      //filter out metric errors and non-value metrics
      if (
        m.name !== "metric_error" &&
        m.tables[0].columns[0].name === "value"
      ) {
        // Create a new metric object (See: metric.ts)
        const unit = m.tables[0].columns[0].description.replace(
          /\.*<\/*p>/g,
          ""
        );
        const metric = new Metric(
          m.name,
          m.title.replace("Metric", ""),
          m.description,
          unit
        );
        metrics.push(metric);
      }
    });
    return metrics;
  }

  // Gets requested metric data
  getMetrics$(metric?: string): Observable<Metric[]> {
    let metricsURL =
      "https://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200";
    if (metric) {
      metricsURL += metric;
    }

    return this.http.jsonp(metricsURL, "callback").pipe(map(this.mapMetrics));
  }
}
