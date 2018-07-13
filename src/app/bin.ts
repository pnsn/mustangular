export class Bin {
  
  constructor (
    public count: number,
    public color:string,
    public position: number,
    public layer: string,
    public max?: number,
    public min?: number,
    public width?: number
  ){}
  
  setWidth(count : number) : void {
   this.width = 85 * this.count / count;
  }

}
