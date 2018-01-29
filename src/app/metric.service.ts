import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Metric } from './metric'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// TODO: handle errors
@Injectable()


//fetches all metrics from IRIS
export class MetricService {

  constructor(private http: HttpClient) { 
   }
   
   private mapMetrics(response:Response): Metric[]{
     return response.metrics.map(metric => {
       return <Metric>{
         name: metric.name,
         title: metric.title,
         description: metric.description,
         value: metric.tables[0].columns[0].description
       };
     });
   }

   
  getMetrics(metric?: String) : Observable <Metric[]>{
    const metricsURL = 'http://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200';
    if (metric)
      metricsURL += "&metric=" + metric;

    return this.http.jsonp(metricsURL, 'callback').pipe(
      map(
        this.mapMetrics
      )
    );
  }
  

}
