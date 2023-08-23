// Get metric information from MUSTANG

import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { Metric } from "@models/metric";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { metricsData } from "./metrics.query";
import { MUSTANG_URL } from "app/tokens";

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
  private metricUrl = "/mustang/metrics/1/query?output=jsonp&nodata=200";
  private valueRegex = new RegExp(/Units='([^']*)'(?=.*<p>)?/);
  constructor(
    private http: HttpClient,
    @Inject(MUSTANG_URL) private mustangUrl: string
  ) {}

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
        const value = m.tables[0].columns.find((c) => c.name === "value");
        let unit: string;
        if (value) {
          try {
            const match = value.description.match(this.valueRegex);
            unit = match[1];
          } catch {
            unit = "";
          }
        }
        const metric = new Metric(
          m.name,
          m.title.replace("Metric", ""),
          m.description,
          unit ?? ""
        );

        metrics.push(metric);
      }
    });
    return metrics;
  }

  // Gets requested metric data
  getMetrics$(metric?: string): Observable<Metric[]> {
    let metricsURL = this.mustangUrl + this.metricUrl;
    console.log(metricsURL);
    if (metric) {
      metricsURL += metric;
    }

    return this.http.jsonp(metricsURL, "callback").pipe(
      map((r: MetricResponse) => {
        return metricsData as MetricResponse;
      }),
      map(this.mapMetrics.bind(this))
    );
  }
}
