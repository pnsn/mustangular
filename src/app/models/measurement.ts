// Describes a Measurement object
export class Measurement {
  constructor(
    public end: string,
    public lddate: string,
    public start: string,
    public value: number
  ) {}
}
