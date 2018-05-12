import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Metric } from './metric'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// TODO: handle errors
@Injectable()


//fetches all metrics from IRIS
export class MetricsService {

  constructor(private http: HttpClient) { 
   }
   
   private mapMetrics(response: any): Metric[]{
     return response.metrics.map(metric => {
       return new Metric(
         metric.name,
         metric.title,
         metric.description,
         metric.tables[0].columns[0].description
         );
     });
   }

   //metric is optional so it can be used by the form
  getMetrics(metric?: String) : Observable <Metric[]>{
    var metricsURL = 'http://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200';
    if (metric)
      metricsURL += metric;

    return this.http.jsonp(metricsURL, 'callback').pipe(
      map(
        this.mapMetrics
      )
    );
  }
  

}
