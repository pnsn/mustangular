// Get metric information from MUSTANG

import {throwError as observableThrowError,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Metric } from '../metric'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class MetricsService {

  constructor (
    private http: HttpClient
  ) {}
  
  // Returns metrics
  private mapMetrics(response: any): any{
    return response.metrics;
  }

  // Gets requested metric data
  getMetrics(metric?: String) : Observable <Metric[]>{
    var metricsURL = 'http://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200';
    if (metric)
      metricsURL += metric;
    return this.http.jsonp(metricsURL,"callback")
      .pipe(
        map(this.mapMetrics),
        catchError((error: Error) => {
          return observableThrowError(error);
        })
    );
  }
  

}
