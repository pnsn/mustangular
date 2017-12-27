export class Metric {

  constructor (
    public name: string,
    public title: string,
    public description?: string,
    public version?: int,
    public unit?: string
  ) {}
}
