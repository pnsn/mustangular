// Gets parameters from URL

import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Query } from './query';
import { Display } from './display'

@Injectable()
export class ParametersService {
  
  constructor (
    private route:ActivatedRoute
  ){}
  
  private query = new Subject<Query>(); // Subscribeable query parameters
  private display : Display = new Display(); // Display information
  
  // Returns query parameters
  getQuery() : Observable<Query> {
    return this.query.asObservable();
  }

  // Returns display parameters
  getDisplay() : any {
    return this.display;
  }
  
  // Sets display with url parameters
  setDisplay( params  : any) : void{
    let d = this.display;
    d.coloring = params.coloring;
    d.binning = {
      "count" : Number(params.bincount),
      "min" : Number(params.binmin),
      "max" : Number(params.binmax) 
    };
    d.invert = params.invert;
    d.displayValue = params.value; 
    d.channels.active = params.channels ? params.channels.split() : null; 
    d.channels.available = params.cha ? params.cha.split() : null;
    this.display = d;
  }
  
  // Grab query parameters from URL
  setQueryParameters() : void {
    this.route.queryParamMap
      .subscribe(params => {
        if(params && params["params"]){
          var pa = params["params"];
          //grab other query params here
          
          let query = new Query(
            pa.net,
            pa.cha,
            pa.sta,
            pa.loc,
            pa.qual,
            pa.start,
            pa.end,
            pa.metric
          );
          this.setDisplay(pa);
          query.sanitize();
          this.query.next(query);
        }
      });
  }

}
