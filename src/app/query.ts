export class Query {
  constructor (
    public net?: string,
    public cha?: string,
    public sta?: string,
    public loc?: string,
    public qual?: string,
    public start?: string,
    public end?: string,
    public metric?: string
  ) {}

 getString(keys?: array): string {
    var str = "";

    let keys = keys ? keys : ["net","cha","sta","loc","qual","start","end","metric"];
    for (let key of keys) {
      if(this[key]){
        str += "&" + key + "=" + this[key];
      }
    }
    return str;
  }
}
