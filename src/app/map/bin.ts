export class Bin {

  constructor (
    public count: number,
    public color: string,
    public position: number,
    public layer: string,
    public max?: number,
    public min?: number,
    public width?: number
  ) {}

  // Width of bid for histogram
  setWidth(count: number): void {
   this.width = 85 * this.count / count;
  }

  // Returns if value falls in bin
  inBin(value: number): boolean {
    return value >= this.min && value < this.max;
  }

}
