import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute} from '@angular/router';
import { Query } from './query';

@Injectable()
export class ParametersService {

  //fake initial values here

  constructor(private route:ActivatedRoute) { }
  
  private query = new Subject<Query>();

  getQuery() : Observable<Query> {
    return this.query.asObservable();
  }
  
  getDisplay() : any { //TODO: deal with these values from URL. - these are defaults in case there is none on activeMEtric
    return {
      "binning" : {
        "max" : null,
        "min" : null,
        "count" : null
      },
      "coloring" : {
        "high" : null,
        "low" : null
      },
      "displayValue" : null
    }
  }
  //TODO: sanitize
  
  setQueryParameters() : void {
    this.route.queryParamMap
      .subscribe(params => {
        if(params && params["params"]){
          var pa = params["params"];
          console.log("have parameter");
          this.query.next(new Query(
            pa.net,
            pa.cha,
            pa.sta,
            pa.loc,
            pa.qual,
            pa.start,
            pa.end,
            pa.metric
          ));
        }
      });
  }

}
