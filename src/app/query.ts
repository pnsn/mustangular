// Describes a Query object
// {
//   net: string,
//   cha: string,
//   sta: string,
//   loc: string,
//   qual: string,
//   start: string,
//   end: string,
//   metric: string
// }
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
  
  // Returns a string of requested query parameters
 getString(keys?: Array<string>): string {
    var str = "";

    let queryKeys = keys ? keys : ["net","cha","sta","loc","qual","start","end","metric"];
    for (let key of queryKeys) {
      if(this[key]){
        str += "&" + key + "=" + this[key];
      }
    }
    return str;
  }
  
  // Cleans up the query parameters so they can be used
  sanitize(start: any, end:any) : void {
    let queryKeys = ["net","cha","sta","loc","qual","metric"];
    for (let key of queryKeys) {
      if(this[key]){
        this[key] = this[key].replace(/\s/gm,"").toUpperCase(); //remove spaces
      }
    }
    this.start = start.format("YYYY-MM-DD");
    this.end = end.format("YYYY-MM-DD");
  }
}