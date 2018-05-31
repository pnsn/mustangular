import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Metric } from './metric';

@Injectable()
export class ActiveService {
  constructor() { }

  // private status = new Subject<string>("In Progress");
  
  private activeMetric = new Subject<Metric>(); //TODO:fix this
  
  getActiveMetric() : Observable<Metric> {
    return this.activeMetric.asObservable();
  } 
  
  setActiveMetric(metric:Metric) : void {
    this.activeMetric.next(metric);
  }
}