// Fetches station data from IRIS FDSNWS


import {throwError as observableThrowError,  Observable, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map, mergeMap, tap, concatMap} from 'rxjs/operators';
import { Station } from '../map/station';
import { Metric } from '../map/metric';


@Injectable()
export class StationsService {
  stations = {};

  constructor (
    private http: HttpClient
  ) {}

  getMissingStationInformation (stationCode){
    return this.stations[stationCode] ? this.stations[stationCode] : null;
  }

  getStationData(queryString: string, stations : any) {
    return this.getFDNSWSStations(queryString, stations["M"]).pipe(
      concatMap(response => {
        this.stations = {...this.stations, ...response};
        return this.getPH5Stations(queryString, stations["D"]).pipe(
          tap(
            response => {
              this.stations = {...this.stations, ...response};
            }
          )
        );
      })
    );
  }

   // Parse text file and map to station objects
   private mapStations(response: String) {
     const lines = response.split('\n');
     const headers = lines.shift();
     const stations = {};

     for (const line of lines) {
       if (line.length > 1) {
         const sta = line.split('|');
         const staCode = sta[0] + '.' + sta[1];
         stations[staCode] = {
          name: sta[5],
          lat: parseFloat(sta[2]),
          lon: parseFloat(sta[3])
         };

       }
     }
     return stations;
   }

   // Fetch stations from FDSNWS
  getFDNSWSStations(queryString : string, stations : string[]): Observable <any> {
    if(stations.length > 0) {
      const stationsURL = 'https://service.iris.edu/fdsnws/station/1/query?format=text' + queryString + "&sta=" + stations.toString();
      return this.http.get(stationsURL, { responseType: 'text' })
        .pipe(
          map(this.mapStations)
        );
    } else {
      return of({});
    }
  }

  // Fetch stations from PH5 service
  getPH5Stations(queryString: string, stations : string[]): Observable <any> {
    if(stations.length > 0) {
      const stationsURL = 'https://service.iris.edu/ph5ws/station/1/query?format=text' + queryString + "&sta=" + stations.toString();
      return this.http.get(stationsURL, { responseType: 'text' })
        .pipe(
          map(this.mapStations)
        );

    } else {
      return of({});
    }
  }

}
