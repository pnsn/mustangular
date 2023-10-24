export class Bin {
  constructor(
    // number of items in bin
    public count: number,
    // color code for bin
    public color: string,
    // position of bin in all bins
    public position: number,
    // name of corresponding map layer
    public layer: string,
    // max bin value
    public max?: number,
    // min bin value
    public min?: number,
    // width in px of bin
    public width?: number
  ) {}

  // Width of bid for histogram
  setWidth(count: number): void {
    this.width = (85 * this.count) / count;
  }

  // Returns if value falls in bin
  inBin(value: number, index: number, count: number): boolean {
    if (count - 1 === index) {
      //no data
      return (value !== 0 && !value) || value === null;
    } else if (count - 2 === index) {
      //2nd to last bin for > than range
      return value > this.min && value <= this.max;
    } else if (count - 3 === index) {
      //3rd to last bin is inclusive
      return value >= this.min && value <= this.max;
    } else {
      return value >= this.min && value < this.max;
    }
  }
}
