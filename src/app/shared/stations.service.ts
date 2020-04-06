// Fetches station data from IRIS FDSNWS


import {throwError as observableThrowError,  Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { Station } from '../map/station';
import { Metric } from '../map/metric';


@Injectable()
export class StationsService {
  private stations;

  constructor (
    private http: HttpClient
  ) {}

  getMissingStationInformation (stationCode){
    return this.stations[stationCode] ? this.stations[stationCode] : null;
  }

    getStationData(queryString: string, stations : any, metrics: Metric[]) {
      console.log(stations["D"].toString());
      for( let station of stations) {
        console.log(station)
        if(station.qual == "D") {

          // get Data from FDSNWSS
        } else {
          
        }
      }


      return of(metrics);

    }

   // Parse text file and map to station objects
   private mapStations(response: String) {
     const lines = response.split('\n');
     const headers = lines.shift();

     for (const line of lines) {
       if (line.length > 1) {
         const sta = line.split('|');
        //  const station = new Station(sta[0], sta[1], parseFloat(sta[3]), sta[5]);
         this.stations[sta[0] + '.' + sta[1]] = { 
          name :this.stations[sta[5]],
          lat : this.stations[parseFloat(sta[2])].lat,
          lon : this.stations[parseFloat(sta[3])].lon
        };
       }
     }
   }

   // Fetch stations from FDSNWS
  getFDNSWSStations(queryString: string): Observable <any> {

    const stationsURL = 'https://service.iris.edu/fdsnws/station/1/query?format=text' + queryString;

    return this.http.get(stationsURL, { responseType: 'text' })
      .pipe(
        map(this.mapStations),
        catchError((error: Error) => {
          return observableThrowError(error);
        })
      );

  }

  // Fetch stations from PH5 service
  getPH5Stations(queryString: string): Observable <any> {

    const stationsURL = 'https://service.iris.edu/ph5ws//station/1/query?format=text' + queryString;

    return this.http.get(stationsURL, { responseType: 'text' })
      .pipe(
        map(this.mapStations),
        catchError((error: Error) => {
          return observableThrowError(error);
        })
      );

  }


}
