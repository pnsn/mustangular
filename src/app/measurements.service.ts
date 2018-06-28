// Fetches measurements from MUSTANG

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Measurement } from './measurement'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
      map(
        this.mapMeasurements
      )
      //catch some errors
    );

  }
}
