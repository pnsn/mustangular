import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Active } from './active';

@Injectable()
export class ActiveService {
  constructor() { }

  private status = new BehaviorSubject<string>("In Progress");
  
  private active = new BehaviorSubject<Active>(); //TODO:fix this
  
  getActive = this.active.asObservable();
  
  setActive(active:Active) : void {
    this.active.next(active);
  }
}