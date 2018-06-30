// Get metric information from MUSTANG

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Metric } from './metric'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// TODO: handle errors
@Injectable()
export class MetricsService {

  constructor (
    private http: HttpClient
  ) {}
   
  // Returns metrics
  // TODO: is this needed??
  private mapMetrics(response: any): any{
    return response.metrics;
  }

  // Gets requested metric data
  getMetrics(metric?: String) : Observable <Metric[]>{
    var metricsURL = 'http://service.iris.edu/mustang/metrics/1/query?format=jsonp&nodata=200';
    if (metric)
      metricsURL += metric;

    return this.http.jsonp(metricsURL, 'callback')
      .pipe(
        map(this.mapMetrics),
        catchError((error: Error) => {
          return Observable.throw(error);
        })
    );
  }
  

}
