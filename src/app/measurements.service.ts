import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Measurement } from './measurement'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// TODO: handle errors
@Injectable()


//fetches all metrics from IRIS
export class MeasurementsService {

  constructor(private http: HttpClient) { 
   }
   
   private mapMetrics(response: Response): void{
     console.log(response)

   }

   
  getMeasurements(queryString : string) : Observable <any>{
    
    var measurementsURL = 'http://service.iris.edu/mustang/measurements/1/query?output=jsonp&nodata=200' + queryString;
    var measurements = []; 
    
    console.log(measurementsURL)
    
    return this.http.jsonp(measurementsURL, 'callback').pipe(
      map(
        this.mapMetrics
      )
    );

  }
  

}
