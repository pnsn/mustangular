import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute} from '@angular/router';
import { Query } from './query';
import { Display } from './display'

@Injectable()
export class ParametersService {

  //fake initial values here

  constructor(private route:ActivatedRoute) { }
  
  private query = new Subject<Query>();

  getQuery() : Observable<Query> {
    return this.query.asObservable();
  }
  
  private display : Display = new Display();
  
  
  getDisplay() : any { //TODO: deal with these values from URL. - these are defaults in case there is none on activeMEtric
    return this.display;
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
