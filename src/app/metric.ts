import { Display } from './display'
export class Metric {
  display : Display;
  stations : any;
  constructor (
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string
  ) {
    this.display = new Display();
    this.stations = {}
  }
}
