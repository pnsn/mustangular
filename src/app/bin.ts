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
    
  private setMax(max : number) : void {
   this.max = max; 
  }

  private setMin(min : number) : void {
   this.min = min; 
  }
  
  private setWidth(count : number) : void {
   this.width = 100 * this.count / count;
  }

}
