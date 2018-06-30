// Fetches measurements from MUSTANG

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, throw} from 'rxjs/operators';
import { Station } from './station';
import 'rxjs/add/observable/throw';

// TODO: handle errors
@Injectable()
export class MeasurementsService {

  constructor (
    private http: HttpClient
  ) {}
   
  // Returns the measurements
  private mapMeasurements(response: any): object{
    return response.measurements;
  }
 
  // Gets the measurements from the IRIS service
  getMeasurements(queryString : string) : Observable <any>{
    var measurementsURL = 'http://service.iris.edu/mustang/measurements/1/query?output=jsonp&nodata=200' + queryString;
    var measurements = []; 
  
    return this.http.jsonp(measurementsURL, 'callback').pipe(
      map(this.mapMeasurements),
        catchError((error: Error) => {
          console.log(error)
          return Observable.throw(error);
        })
      )
    );

  }
}
