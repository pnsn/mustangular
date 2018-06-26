import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Query } from './query';
import { Display } from './display'

@Injectable()
export class ParametersService {

  //fake initial values here

  constructor(private route:ActivatedRoute, private location : Location){}
  
  private query = new Subject<Query>();

  getQuery() : Observable<Query> {
    return this.query.asObservable();
  }
  
  private display : Display = new Display();
  
  
  getDisplay() : any { //TODO: deal with these values from URL.
    return this.display;
  }
  
  setDisplay( params  : any) : void{
    let d = this.display;
    d.coloring = {
      "high" : params.high,
      "low" : params.low
    };
    d.binning = {
      "count" : Number(params.count),
      "min" : Number(params.min),
      "max" : Number(params.max) 
    };
    d.displayValue = params.value; 
    d.channels.active = params.channels; 
    
    this.display = d;
    console.log("should happen once", this.display)
  }
  //TODO: sanitize
  
  setQueryParameters() : void {
    this.route.queryParamMap
      .subscribe(params => {
        if(params && params["params"]){
          var pa = params["params"];
          //grab other query params here
          
          if(pa.cha) {
            this.display.channels.available = pa.cha.split(",");
          }

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
