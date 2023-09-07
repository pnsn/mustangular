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
  private dataUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(MUSTANG_URL) private mustangUrl: string
  ) {}

  getUrl(): string {
    return this.dataUrl;
  }

  // Gets the measurements from the IRIS service
  getMeasurements$(
    queryString: string,
    type?: string
  ): Observable<MeasurementData> {
    this.dataUrl = this.mustangUrl + this.measurementUrl + queryString;

    const output = `&output=${type || "jsonp"}`;

    return this.http
      .jsonp(this.dataUrl + output, "callback")
      .pipe(
        map((response: MeasurementResponse) => response.measurements ?? {})
      );
  }
}
