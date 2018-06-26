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
  
  sanitize() : void {
    let queryKeys = ["net","cha","sta","loc","qual","metric"];
    for (let key of queryKeys) {
      if(this[key]){
        this[key] = this[key].replace(/\s/gm,"").toUpperCase(); //remove spaces
      }
    }
    
    var start = this.start ? new Date(this.start) : null;
    var end = this.end ? new Date(this.end) : null;
    
    if(start && end) {
      this.start = start.toISOString().replace(/Z.*$/gim, "");
      this.end = end.toISOString().replace(/Z.*$/gim, "");
    }
  }
}