// Fetches measurements from MUSTANG

import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MUSTANG_URL } from "app/tokens";

export interface Measurement {
  cha: string;
  end: string;
  lddate: string;
  loc: string;
  net: string;
  qual: string;
  start: string;
  target: string;
  value: number;
  sta: string;
}
export type MeasurementData = Record<string, Measurement[]>;
export interface MeasurementResponse {
  measurements?: MeasurementData;
}

@Injectable()
export class MeasurementsService {
  private measurementUrl = "/mustang/measurements/1/query?nodata=200";

  constructor(
    private http: HttpClient,
    @Inject(MUSTANG_URL) private mustangUrl: string
  ) {}

  getUrl(): string {
    return this.mustangUrl + this.measurementUrl;
  }

  // Gets the measurements from the IRIS service
  getMeasurements$(
    queryString: string,
    type?: string
  ): Observable<MeasurementData> {
    let measurementsURL = this.getUrl() + queryString;

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
