// Get metric information from MUSTANG

import {throwError as observableThrowError,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Metric } from '../map/metric';
import { HttpClient} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class MetricsService {

  constructor (
    private http: HttpClient,
  ) {}

  // Returns metrics
  private mapMetrics(response: any): Metric[] {
    return response.metrics.filter(m => m.name != 'metric_error');
  }

  // Gets requested metric data
  getMetrics(metric?: String): Observable <Metric[]> {
    let metricsURL = 'http://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200';
    if (metric) {
      metricsURL += metric;
    }

    return this.http.jsonp(metricsURL, 'callback')
      .pipe(
        map(this.mapMetrics)
      );
  }


}
