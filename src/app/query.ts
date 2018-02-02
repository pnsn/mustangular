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

 getString(): string {
    var str = "";
    let keys = ["net","chan","sta","loc","qual","start","end","metric"];
    for (let key of keys) {
      if(this[key]){
        str += "&" + key + "=" + this[key];
      }
    }
    return str;
  }
}
