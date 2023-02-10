// Get metric information from MUSTANG

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Metric } from "@models/metric";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface MetricResponse {
  metrics?: any[];
}
@Injectable()
export class MetricsService {
  constructor(private http: HttpClient) {}

  // Returns metrics and filters out errored metrics
  private mapMetrics(response: MetricResponse): Metric[] {
    return response.metrics.filter((m) => m.name !== "metric_error");
  }

  // Gets requested metric data
  getMetrics(metric?: string): Observable<Metric[]> {
    let metricsURL =
      "https://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200";
    if (metric) {
      metricsURL += metric;
    }

    return this.http.jsonp(metricsURL, "callback").pipe(map(this.mapMetrics));
  }
}