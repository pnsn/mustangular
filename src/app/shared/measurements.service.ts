// Fetches measurements from MUSTANG

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';

@Injectable()
export class MeasurementsService {

  constructor (
    private http: HttpClient
  ) {}

  // Returns the measurements
  private mapMeasurements(response: any): object {
    return response.measurements;
  }

  getUrl(): string {
    return this.url;
  }

  private url = 'http://service.iris.edu/mustang/measurements/1/query?nodata=200';

  // Gets the measurements from the IRIS service
  getMeasurements(queryString: string, type?: string): Observable <any> {
    this.url += queryString;

    let measurementsURL = this.url;
    if (type) {
      measurementsURL += '&output' + type; //FIXME: is this right
    } else {
      measurementsURL += '&output=jsonp';
    }


    return this.http.jsonp(measurementsURL, 'callback')
      .pipe(
        map(this.mapMeasurements)
      );
  }
}
