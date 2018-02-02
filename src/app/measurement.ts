export class Measurement {

  constructor (
    public cha: string,
    public end: string,
    public lddate: string,
    public loc: string,
    public net: string,
    public qual: string,
    public start: string,
    public target: string,
    public value: number
  ) {}
}
