// Fetches station data from IRIS FDSNWS

import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, concatMap } from "rxjs/operators";

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
  getStationsData(queryString: string): Observable<Stations> {
    return this.getStations("fdsnws", queryString).pipe(
      catchError((err) => {
        // if no stations, keep going
        if (this.stationCount === 0) {
          return of({});
        } else {
          // An actual error should be thrown
          throwError(err);
        }
      }),
      concatMap((fdsnResponse) => {
        this.stationCount = Object.keys(fdsnResponse).length;
        this.stations = { ...this.stations, ...fdsnResponse };
        return this.getStations("ph5ws", queryString).pipe(
          tap((ph5Response) => {
            this.stationCount += Object.keys(ph5Response).length;
            this.stations = { ...this.stations, ...ph5Response };
          }),
          catchError((err) => {
            // if neither have stations, throw error
            if (this.stationCount === 0) {
              throw new Error("No station data returned: " + err);
            } else {
              // if one has stations, keep going
              return of({});
            }
          })
        );
      })
    );
  }

  // Parse text file and map to station objects
  private mapStations(response: string): Stations {
    const lines = response.split("\n");
    const _headers = lines.shift();
    const stations = {};

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
    return stations;
  }

  // Fetch stations from service
  getStations(source: string, queryString: string): Observable<Stations> {
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
