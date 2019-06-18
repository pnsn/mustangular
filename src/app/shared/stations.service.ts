// Fetches station data from IRIS FDSNWS


import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { Station } from '../station';


@Injectable()
export class StationsService {
  
  constructor (
    private http: HttpClient
  ) {}
   
   // Parse text file and map to station objects
   private mapStations(response: String): Object{
     var stations = {};
     var lines = response.split('\n');
     var headers = lines.shift();

     for (let line of lines){
       if(line.length > 1) {
         var sta = line.split("|");
         var station = new Station(sta[0], sta[1], parseFloat(sta[2]), parseFloat(sta[3]), sta[5]);
         stations[sta[0]+"."+sta[1]] = station;
       }
     }
     return stations;
   }

   // Fetch requested stations
  getStations(queryString : string) : Observable <any>{
    
    var stationsURL = 'http://service.iris.edu/fdsnws/station/1/query?format=text' + queryString;

    return this.http.get(stationsURL, { responseType: 'text' })
      .pipe(
        map(this.mapStations),
        catchError((error: Error) => {
          return observableThrowError(error);
        })
      )
  
  }

  
}
