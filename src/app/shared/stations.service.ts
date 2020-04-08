// Fetches station data from IRIS FDSNWS


import {throwError as observableThrowError,  Observable, of, EMPTY, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map, mergeMap, tap, concatMap} from 'rxjs/operators';
import { Station } from '../map/station';
import { Metric } from '../map/metric';


@Injectable()
export class StationsService {
  stations = {};
  private stationCount : number = 0;
  constructor (
    private http: HttpClient
  ) {}

  getMissingStationInformation (stationCode){
    return this.stations[stationCode] ? this.stations[stationCode] : null;
  }

  getStationData(queryString: string) {
    return this.getStations("fdsnws", queryString).pipe(
      catchError((err, caught) => {
        //if no stations, keep going
        if(this.stationCount === 0) {
          return of({});
        } else { //An actual error should be thrown
          throwError(err);
        }
      }),
      concatMap(response => {
        this.stationCount = Object.keys(response).length;
        this.stations = {...this.stations, ...response};
        return this.getStations("ph5ws", queryString).pipe(
          tap(
            response => {
              this.stationCount += Object.keys(response).length;
              this.stations = {...this.stations, ...response};
            }
          ),
          catchError(err => {
            //if neither have stations, throw error
            if(this.stationCount === 0) {
              throw "No station data returned: " + err;
            } else {
              //if one has stations, keep going
              return of({});
            }
          })

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

  // Fetch stations from service
  getStations(source: string, queryString: string): Observable <any> {
    const stationsURL = 'https://service.iris.edu/' + source + '/station/1/query?format=text' + queryString;
    return this.http.get(stationsURL, { responseType: 'text' })
      .pipe(
        map(this.mapStations)
      );
  }
}
