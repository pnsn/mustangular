import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Metric } from './metric'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// TODO: handle errors
@Injectable()


//fetches all metrics from IRIS
export class MeasurementsService {

  constructor(private http: HttpClient) { 
   }
   

   
  getMeasurements(params: String) : Observable <Measurements[]>{
    const measurementsURL = 'http://service.iris.edu/mustang/metrics/1/query?output=jsonp&nodata=200';

    // return this.http.jsonp(metricsURL, 'callback').pipe(
    //   map(
    //     this.mapMetrics
    //   )
    // );
  }
  

}
