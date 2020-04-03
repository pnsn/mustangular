// Describes a Measurement object
// {
//   end : string,
//   lddate : string,
//   qual : string,
//   start : string,
//   value : string
// }

export class Measurement {

  constructor (
    public end: string,
    public lddate: string,
    public start: string,
    public value: number
  ) {}

}
