// Describes a Measurement object
// {
//   end : string,
//   lddate : string,
//   qual : string,
//   start : string,
//   target : string,
//   value : string
// }

export class Measurement {

  constructor (
    public end: string,
    public lddate: string,
    public qual: string,
    public start: string,
    public target: string, //might not need this
    public value: number
  ) {}
  
}
