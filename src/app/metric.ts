export class Metric {

  constructor (
    public name: string,
    public title: string,
    public description?: string,
    public unit?: string,
    public measurements?: <Measurement[]>
  ) {}
}
