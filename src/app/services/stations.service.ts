// Fetches station data from IRIS FDSNWS

import { Observable, forkJoin, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

export interface StationData {
  name: string;
  lat: number;
  lon: number;
}
export type Stations = Record<string, StationData>;

@Injectable()
export class StationsService {
  stations: Stations = {};
  private stationCount = 0;
  constructor(private http: HttpClient) {}

  /** returns data for single station with code */
  getStationData(stationCode: string): StationData {
    return this.stations[stationCode] ?? null;
  }

  // Concat data from fdnsws and ph5ws
  getStationsData$(queryString: string): Observable<Stations> {
    return forkJoin({
      fdsnws: this.getStations$("fdsnws", queryString),
      ph5ws: this.getStations$("ph5ws", queryString),
    }).pipe(
      tap(({ fdsnws, ph5ws }) => {
        this.stations = { ...fdsnws, ...ph5ws };
        this.stationCount = Object.keys(this.stations).length;
      }),
      map(() => {
        return this.stations;
      }),
      catchError((err) => {
        // if no stations, keep going
        if (this.stationCount === 0) {
          return of({});
        } else {
          // An actual error should be thrown
          return throwError(new Error(err));
        }
      })
    );
  }

  // Parse text file and map to station objects
  private mapStations(response: string): Stations {
    const stations = {};
    if (response) {
      const lines = response.split("\n");
      const _headers = lines.shift();

      for (const line of lines) {
        if (line.length > 1) {
          const sta = line.split("|");
          const staCode = sta[0] + "." + sta[1];
          stations[staCode] = {
            name: sta[5],
            lat: parseFloat(sta[2]),
            lon: parseFloat(sta[3]),
          };
        }
      }
    }
    return stations;
  }

  // Fetch stations from service
  private getStations$(
    source: string,
    queryString: string
  ): Observable<Stations> {
    const stationsURL =
      "https://service.iris.edu/" +
      source +
      "/station/1/query?format=text" +
      queryString;
    return this.http
      .get(stationsURL, { responseType: "text" })
      .pipe(map(this.mapStations));
  }
}
