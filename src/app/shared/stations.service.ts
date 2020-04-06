// Fetches station data from IRIS FDSNWS


import {throwError as observableThrowError,  Observable, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { Station } from '../map/station';
import { Metric } from '../map/metric';


@Injectable()
export class StationsService {
  private stations = {};

  constructor (
    private http: HttpClient
  ) {}

  getMissingStationInformation (stationCode){
    return this.stations[stationCode] ? this.stations[stationCode] : null;
  }

  getStationData(queryString: string, stations : any, metrics: Metric[]) {
    console.log(stations)
    return this.getFDNSWSStations(stations["M"]).pipe(
      mergeMap(response => {
        console.log("I got called")
        return this.getPH5Stations(stations["D"]);
      })
    );
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
     return;
   }

   // Fetch stations from FDSNWS
  getFDNSWSStations(stations : string[]): Observable <any> {
    console.log("stations")
    if(stations.length > 0) {
      const queryString = stations.toString();
      const stationsURL = 'https://service.iris.edu/fdsnws/station/1/query?format=text' + queryString;

      console.log("trying to get FDSNWS")
      return this.http.get(stationsURL, { responseType: 'text' })
        .pipe(
          map(this.mapStations)
        );
    } else {
      console.log("no fdnsws")
      return of("no fdnsws");
    }
  }

  // Fetch stations from PH5 service
  getPH5Stations(stations : string[]): Observable <any> {
    console.log("PH5 stations", stations)
    if(stations.length > 0) {
      const queryString = stations.toString();
      const stationsURL = 'https://service.iris.edu/ph5ws/station/1/query?format=text' + queryString;
      console.log("Trying to get PH5")
      return this.http.get(stationsURL, { responseType: 'text' })
        .pipe(
          map(this.mapStations)
        );

    } else {
      return of("no ph5");
    }
  }

}
