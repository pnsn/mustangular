import { DisplayValue } from './display-value';
import { Measurement } from './measurement';
export class Channel {
  
  constructor (
    public name: string,
    public measurements?: Measurement[],
    public displayValue?: DisplayValue[] 
  ) {}
  
  
  
}
