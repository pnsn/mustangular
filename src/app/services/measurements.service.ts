// Fetches measurements from MUSTANG

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

export interface MeasurementResponse {
  measurements?: any;
}
@Injectable()
export class MeasurementsService {
  private url =
    "https://service.iris.edu/mustang/measurements/1/query?nodata=200";

  constructor(private http: HttpClient) {}

  getUrl(): string {
    return this.url;
  }

  // Gets the measurements from the IRIS service
  getMeasurements(queryString: string, type?: string): Observable<any> {
    this.url += queryString;

    let measurementsURL = this.url;
    if (type) {
      measurementsURL += "&output" + type; // FIXME: is this right
    } else {
      measurementsURL += "&output=jsonp";
    }

    return this.http
      .jsonp(measurementsURL, "callback")
      .pipe(
        map((response: MeasurementResponse) => response.measurements ?? {})
      );
  }
}
