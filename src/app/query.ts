export class Query {
  constructor (
    public net?: string,
    public chan?: string,
    public sta?: string,
    public loc?: string,
    public qual?: string,
    public start?: string,
    public end?: string,
    public metric?: string
  ) {}
}
